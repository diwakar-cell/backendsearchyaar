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
router.get('/products',ServiceController.getAllProductListings);
router.get('/deals',ServiceController.getAllDealsListings);
router.get('/state',ServiceController.getCategory);
router.get('/city',ServiceController.getCategory);
router.get('/events',ServiceController.getAllEventsListings);
router.get('/service',ServiceController.getAllServicesListings);



module.exports = router;