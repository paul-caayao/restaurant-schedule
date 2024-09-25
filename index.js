import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import restaurantRoute from "./routes/restaurant.route.js";
import restaurantService from "./services/restaurantService.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = "mongodb+srv://paulcaayao:mA1miEWx5qmV2xgY@backenddb.zwnzo.mongodb.net/Restaurant-Schedule-Japan?retryWrites=true&w=majority&appName=BackendDB";

app.use(express.json());
app.use("/api/restaurants", restaurantRoute);
app.get("/", (_, res) => {
  res.send("Paul Caayao - Restaurant Schedule Finder");
});

console.log(mongoURI);


mongoose
  .connect(mongoURI)
  .then(async () => {
    await restaurantService.initializeRestaurants();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

export default app;
