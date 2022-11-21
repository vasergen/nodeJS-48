const supertest = require("supertest");
const { app } = require("../../app");
const mongoose = require("mongoose");
const { User } = require("../../models/user.model");

require("dotenv").config();

const { HOST_DB_TEST } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(HOST_DB_TEST);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/api/auth/register").send({
      email: "testUser1@gmail.coom",
      password: "1234456",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({
      data: {
        user: {
          _id: expect.any(String),
        },
      },
    });
  });

  it("can not register 2 users with the same email", async () => {
    const email = "testUser2@gmail.coom";
    await supertest(app).post("/api/auth/register").send({
      email,
      password: "1234456",
    });

    const response = await supertest(app).post("/api/auth/register").send({
      email,
      password: "1234457",
    });
    expect(response.statusCode).toBe(409);
  });
});
