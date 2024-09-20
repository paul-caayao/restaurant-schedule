import express from "express";
import {
  getRestaurantsController,
  saveRestaurantController,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", getRestaurantsController);
router.post("/", saveRestaurantController);

export default router;
