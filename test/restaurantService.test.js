import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import app from "../index.js";
import restaurantService from "../services/restaurantService.js";
import Restaurant from "../models/restaurant.model.js";

chai.use(chaiHttp);
const { expect } = chai;

export const mockRestaurants = [
  {
    name: "Ramen Nagi",
    opening_hours: [{ day: "Friday", open: "09:00", close: "22:00" }],
  },
  {
    name: "Ichiran",
    opening_hours: [{ day: "Saturday", open: "09:00", close: "15:00" }],
  },
  {
    name: "Din Tai Fung",
    opening_hours: [{ day: "Sunday", open: "12:00", close: "18:00" }],
  },
  {
    name: "Yakiniku Like",
    opening_hours: [{ day: "Sunday", open: "10:00", close: "14:00" }],
  },
];

describe("Restaurant Service", function () {
  this.timeout(5000);

  beforeEach(() => {
    sinon.stub(Restaurant, "find").returns(Promise.resolve(mockRestaurants));
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return one restaurant", async () => {
    const result = await restaurantService.getRestaurants(
      "2024-09-20T10:00:00"
    );
    expect(result).to.deep.equal(["Ramen Nagi"]);
    expect(result).to.have.lengthOf(1);
  });

  it("should return multiple restaurants", async () => {
    const result = await restaurantService.getRestaurants(
      "2024-09-22T13:00:00"
    );
    expect(result).to.have.lengthOf(2);
  });

  it("should return empty restaurant list for invalid dateTime", async () => {
    const result = await restaurantService.getRestaurants("");
    expect(result).to.have.lengthOf(0);
  });
});

describe("GET /api/restaurants", function () {
  this.timeout(5000);

  beforeEach(() => {
    sinon.stub(Restaurant, "find").returns(Promise.resolve(mockRestaurants));
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return a single restaurant with valid dateTime", async () => {
    const res = await chai
      .request(app)
      .get("/api/restaurants")
      .query({ dateTime: "2024-09-20T12:00:00" });

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(["Ramen Nagi"]);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });

  it("should return multiple restaurant with valid dateTime", async () => {
    const res = await chai
      .request(app)
      .get("/api/restaurants")
      .query({ dateTime: "2024-09-22T13:00:00" });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.is.not.empty;
  });

  it("should return 400 HTTP response for invalid dateTime", async () => {
    const res = await chai
      .request(app)
      .get("/api/restaurants")
      .query({ dateTime: "invalidinput" });

    expect(res).to.have.status(400);
    expect(res.body).to.deep.equal({ error: "Invalid Date Time" });
  });

  it("should return 400 for empty dateTime parameter", async () => {
    const res = await chai
      .request(app)
      .get("/api/restaurants")
      .query({ dateTime: "" });

    expect(res).to.have.status(400);
    expect(res.body).to.deep.equal({ error: "Invalid Date Time" });
  });
});
