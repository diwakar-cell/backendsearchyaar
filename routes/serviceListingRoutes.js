const express = require('express');
const router = express.Router();
const serviceListingController = require('../controller/serviceListingController');
const { verifyToken } = require('../utills/helper');
const upload = require('../middleware/upload,js');

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

router.post("/upload", upload.single("file"),serviceListingController.uploadMedia);

router.delete(
  "/media/:id",
  serviceListingController.deleteMedia
);

router.get(
  '/user-service-listing',
  verifyToken,
  serviceListingController.getServiceListingByUserId
);


module.exports = router;
