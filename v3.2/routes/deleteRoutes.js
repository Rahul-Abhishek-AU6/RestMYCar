const {Router} = require('express');
const router = Router();
const {logoutUser,deletingVehicle} = require('../controllers/deleteControllers');
const {authenticateAdminToken,authenticateCustomerToken,authenticateOwnersToken} = require('../middlewares/authenticate');
const { userLogout } = require('../../0619harisidh/api/controllers/deleteControllers');

//_________________________Owner Route__________________________________________________
router.delete(`/api/owner/deletingvehicle/:vehicleid`, authenticateOwnersToken, deletingVehicle);
router.delete(`/api/owner/logout`, authenticateOwnersToken, userLogout)


//_________________________Owner Route__________________________________________________
router.delete(`/api/customer/logout`, authenticateCustomerToken, userLogout);


//_________________________Owner Route__________________________________________________
router.delete(`/api/admin/logout`,authenticateCustomerToken, userLogout)


module.exports = router;