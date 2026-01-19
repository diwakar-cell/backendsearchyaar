const express = require('express');
const router = express.Router();


const app = express();
const ServiceController = require('../controller/serviceController'); 
// const AuthController = require('../controller/authController'); 
// const sendmail = require('../sendmail')({silent: true});
const { registerValidationRules, validate,loginValidationRules,forgotPasswordValidationRules,changePasswordRules } = require('../validators/authValidation');

router.get('/test', (req, res) => {
  res.json({ message: 'Auth loginnnn route is working!' });
})
router.get('/category',ServiceController.getCategory);
router.get('/products',ServiceController.getCategory);
router.get('/deals',ServiceController.getCategory);
router.get('/state',ServiceController.getCategory);
router.get('/city',ServiceController.getCategory);
router.get('/events',ServiceController.getCategory);
router.get('/service',ServiceController.getCategory);



module.exports = router;