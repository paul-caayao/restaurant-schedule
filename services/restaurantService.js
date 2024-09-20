import fs from "fs";
import path from "path";
import Restaurant from "../models/restaurant.model.js";
import { parseOpeningHours, parseDateTime } from "../utils/utils.js";

const jsonFilePath = path.join(process.cwd(), "data/raw_data.json");

const saveRestaurants = async (restaurants) => {
  const savedRestaurants = [];
  for (const restaurant of restaurants) {
    const { name, opening_hours } = restaurant;

    if (!name || !opening_hours) {
      throw new Error("Name or opening_hours is missing");
    }

    const parsedOpeningHours = parseOpeningHours(opening_hours);
    const newRestaurant = new Restaurant({
      name,
      opening_hours: parsedOpeningHours,
    });

    try {
      const savedRestaurant = await newRestaurant.save();
      savedRestaurants.push(savedRestaurant);
    } catch (error) {
      console.error(`Failed to save restaurant ${name}: ${error.message}`);
    }
  }
  return savedRestaurants;
};

const getRestaurants = async (dateTime) => {
  const { dayOfWeek, time } = parseDateTime(dateTime);
  const restaurants = await Restaurant.find();

  const availableRestaurants = restaurants.filter((restaurant) => {
    const hoursForDay = restaurant.opening_hours.find(
      (hour) => hour.day === dayOfWeek
    );

    if (!hoursForDay) {
      return false;
    }

    const { open, close } = hoursForDay;
    const isOpen = time >= open && time <= close;

    return isOpen;
  });

  return availableRestaurants.map((restaurant) => restaurant.name);
};

const initializeRestaurants = async () => {
  try {
    const data = fs.readFileSync(jsonFilePath, "utf8");
    const jsonData = JSON.parse(data);
    await saveRestaurants(jsonData.restaurants);
  } catch (error) {
    console.error(error.message);
  }
};

export default { getRestaurants, saveRestaurants, initializeRestaurants };
