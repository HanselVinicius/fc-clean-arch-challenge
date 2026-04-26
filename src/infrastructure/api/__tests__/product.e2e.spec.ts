import e from "express";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(10);
    });


    it("should list a product", async () => {
        await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10,
            });
        const response = await request(app).get("/product").send();
        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(1);
        expect(response.body.products[0].name).toBe("Product 1");
        expect(response.body.products[0].price).toBe(10);

    });

});