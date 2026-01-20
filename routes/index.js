const express = require('express');
const router = express.Router();



router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working!' });
});

router.use('/api/auth', require('./authRoute'));
router.use('/api/search', require('./searchRoute'));
router.use('/api/service', require('./serviceListingRoutes'));

// router.use('/', require('./paymentRoute'));

module.exports = router;