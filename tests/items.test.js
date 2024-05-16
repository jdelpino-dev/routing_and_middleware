/**
 * Test suite for items routes.
 * Uses Jest and Supertest to test the API endpoints.
 */

import request from "supertest";
import app from "../src/app.js";
import { writeData } from "../src/utils/dataStore.js";

// Clear the data before each test
beforeEach(() => {
  writeData([]);
});

describe("GET /items", () => {
  test("should return an empty array initially", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  test("should return a list of items", async () => {
    const items = [{ name: "popsicle", price: 1.45 }];
    writeData(items);
    const res = await request(app).get("/items");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(items);
  });
});

describe("POST /items", () => {
  test("should add an item", async () => {
    const newItem = { name: "popsicle", price: 1.45 };
    const res = await request(app).post("/items").send(newItem);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ added: newItem });
  });

  test("should not add an invalid item", async () => {
    const res = await request(app).post("/items").send({ name: "popsicle" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: "Invalid item format" });
  });
});

describe("GET /items/:name", () => {
  test("should return an item", async () => {
    const items = [{ name: "popsicle", price: 1.45 }];
    writeData(items);
    const res = await request(app).get("/items/popsicle");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(items[0]);
  });

  test("should return a 404 for an unknown item", async () => {
    const res = await request(app).get("/items/nonexistent");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});

describe("PATCH /items/:name", () => {
  test("should update an item", async () => {
    const items = [{ name: "popsicle", price: 1.45 }];
    writeData(items);
    const updatedItem = { name: "new popsicle", price: 2.45 };
    const res = await request(app).patch("/items/popsicle").send(updatedItem);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ updated: updatedItem });
  });

  test("should return a 404 for an unknown item", async () => {
    const updatedItem = { name: "new popsicle", price: 2.45 };
    const res = await request(app)
      .patch("/items/nonexistent")
      .send(updatedItem);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});

describe("DELETE /items/:name", () => {
  test("should delete an item", async () => {
    const items = [{ name: "popsicle", price: 1.45 }];
    writeData(items);
    const res = await request(app).delete("/items/popsicle");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });

  test("should return a 404 for an unknown item", async () => {
    const res = await request(app).delete("/items/nonexistent");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});
