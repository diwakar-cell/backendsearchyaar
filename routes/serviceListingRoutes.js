const express = require('express');
const router = express.Router();
const serviceListingController = require('../controller/serviceListingController');
const { verifyToken } = require('../utills/helper');

router.post(
  '/service-listing',verifyToken,
  serviceListingController.createServiceListing
);

router.put(
  '/service-listing/:id',verifyToken,
  serviceListingController.updateServiceListing
);

router.delete(
  '/service-listing/:id',verifyToken,
  serviceListingController.deleteServiceListing
);

router.get(
  '/service-listing',
  serviceListingController.getAllServiceListings
);

router.get(
  '/service-listing/:id',
  serviceListingController.getServiceListingById
);


module.exports = router;
