import mongoose from "mongoose";
import { openingHoursSchema } from "./openingHours.model.js";

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  opening_hours: [openingHoursSchema],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
