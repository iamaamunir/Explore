const express = require("express");

const tourRouter = express.Router();

const tourController = require("../controllers/tourController");

// tourRouter.param('id', tourController.checkID);

// TOUR ROUTES
tourRouter
  .route("/top-5-cheap")
  .get(tourController.aliasQuery, tourController.getAllTours);

tourRouter.route("/tour-stats").get(tourController.getTourStats);
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)

tourRouter
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
