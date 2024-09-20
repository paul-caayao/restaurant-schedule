import restaurantService from "../services/restaurantService.js";

const getRestaurantsController = async (req, res) => {
  const { dateTime } = req.query;

  if (isNaN(new Date(dateTime).getTime())) {
    return res.status(400).json({ error: "Invalid Date Time" });
  }

  try {
    const result = await restaurantService.getRestaurants(dateTime);
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      console.error(`Duplicate entry for restaurant: ${restaurant.name}`);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const saveRestaurantController = async (req, res) => {
  try {
    const { restaurants } = req.body;

    if (!restaurants || !Array.isArray(restaurants)) {
      return res.status(400).json({ error: "Invalid data format" });
    }
    const result = await restaurantService.saveRestaurants(restaurants);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getRestaurantsController, saveRestaurantController };
