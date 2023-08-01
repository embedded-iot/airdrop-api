const ROLE_VALUES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const PERMISSION_VALUES = {
  MANAGE_USERS: 'MANAGE_USERS',
};

const roles = [ROLE_VALUES.USER, ROLE_VALUES.ADMIN];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], [PERMISSION_VALUES.MANAGE_USERS]);

module.exports = {
  ROLE_VALUES,
  PERMISSION_VALUES,
  roles,
  roleRights,
};
