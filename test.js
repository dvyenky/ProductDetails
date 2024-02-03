describe("POST /register", () => {
  it("Should create the new User", async () => {
    const newUser = {
      name: "abc",
      email: "xyz@gmail.com",
      password: "123456",
    };
    const res = await chai.request(app).post("/register").send(newUser);
    expect(res).to.have.status(201);
    expect(res.body)
      .to.have.property("message")
      .that.includes("User Created Successfully");
  });
});

describe("POST /login", () => {
  it("Should create a token when user login successfully", async () => {
    const loginData = {
      email: "logintest@test.com",
      password: "123456",
    };
    const res = await chai.request(app).post("/login").send(loginData);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token").that.is.a("string");
  });
});

describe("POST /addproduct", () => {
  it("Should add the new product", async () => {
    const data = {
      name: "iphone xr",
      description: "this is iPhone XR",
      price: 799,
      stockquantity: "mobile",
    };
    const res = await chai
      .request(app)
      .post("/addProduct")
      .set("Authorization", "Bearer " + token) // Assuming 'token' variable is set correctly
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.be.an("object");
  });
});

describe("GET /products", () => {
  it("Should return all products from the database", async () => {
    const res = await chai.request(app).get("/products");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });
});

describe("GET /product/:productId", () => {
  it("Should get back a single product by the given Id", async () => {
    const id = "valid_product_id"; // Replace with a valid product ID
    const res = await chai.request(app).get(`/product/${id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object").that.has.property("_id", id);
  });
});

describe("PUT /updateproduct/:productId", () => {
  it("Should update an existing product", async () => {
    const updateData = {
      name: "updated iphone xr",
    };
    const productId = "valid_product_id"; // Replace with a valid product ID
    const res = await chai
      .request(app)
      .put(`/updateproduct/${productId}`)
      .set("Authorization", "Bearer " + token) // Assuming 'token' variable is set correctly
      .send(updateData);
    expect(res).to.have.status(200);
    expect(res.body)
      .to.be.an("object")
      .that.has.property("name", updateData.name);
  });
});

describe("DELETE /deleteproduct/:productId", () => {
  it("Should delete a specific product using its ID", async () => {
    const productId = "valid_product_id"; // Replace with a valid product ID
    const res = await chai
      .request(app)
      .delete(`/deleteproduct/${productId}`)
      .set("Authorization", "Bearer " + token); // Assuming 'token' variable is set correctly
    expect(res).to.have.status(200);
    expect(res.body)
      .to.be.an("object")
      .that.has.property("message")
      .equal("Product deleted successfully");
  });
});

describe("DELETE /deleteproduct", () => {
  it("Should delete a specific product using its ID", async () => {
    const res = await chai
      .request(app)
      .delete("/deleteproduct")
      .set("Authorization", "Bearer " + token); // Assuming 'token' variable is set correctly
    expect(res).to.have.status(200);
    expect(res.body)
      .to.be.an("object")
      .that.has.property("message")
      .equal("All products deleted successfully");
  });
});
