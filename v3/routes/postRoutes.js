const {Router} = require('express');
const router = Router();

const {userRegister} = require('../controllers/postControllers');


//_____________________Account Registration_____________________
router.post(`/api/user/register`, userRegister);



module.exports = router;