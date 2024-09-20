import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import restaurantRoute from "./routes/restaurant.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

app.use(express.json());
app.use("/api/restaurants", restaurantRoute);
app.get("/", (_, res) => {
  res.send("Paul Caayao - Restaurant Schedule Finder");
});

mongoose
  .connect(mongoURI)
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

export default app;
