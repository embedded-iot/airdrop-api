/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} content - Results found
   * @property {number} currentPage - Current page
   * @property {number} pageSize - Maximum number of content per page
   * @property {number} totalPage - Total number of pages
   * @property {number} totalElement - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.pageSize] - Maximum number of content per page (default = 10)
   * @param {number} [options.pageNum] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const pageSize = options.pageSize && parseInt(options.pageSize, 10) > 0 ? parseInt(options.pageSize, 10) : 10;
    const pageNum = options.pageNum && parseInt(options.pageNum, 10) > 0 ? parseInt(options.pageNum, 10) : 1;
    const skip = (pageNum - 1) * pageSize;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(pageSize);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalElement, content] = values;
      const totalPage = Math.ceil(totalElement / pageSize);
      const result = {
        content,
        currentPage: pageNum,
        pageSize,
        totalPage,
        totalElement,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
