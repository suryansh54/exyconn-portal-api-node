// server/roles.js
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

const roles = (function () {
  ac.grant('basic')
    .readOwn('profile')
    .updateOwn('profile');
  ac.grant('admin')
    .extend('basic')
    .updateAny('profile')
    .deleteAny('profile')
    .read('getAllUsers');
  return ac;
})();

export default roles;
