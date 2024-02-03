1. Clone the repository:
   git clone <repository-url>

2. Install dependencies:
   cd <project-directory>
   npm install

3. Create a .env file in the project root and provide the following environment variables:
   PORT=8080
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret

4. Start the server:
   npm start


5. The application will be accessible at http://localhost:8080/
    To test the API, you can use tools like Postman or cURL. The endpoints are described below.

=> Create a new User
    URL: localhost:8080/register
    Method : POST
    Body: {"username":"test","email":"xyz@gmail.com","password":"test"}
    Response : { "message": "User registered successfully" }

=> login the user 
    URL: localhost:8080/login
    Method : POST
    Headers : Content-Type = application/json
    Body: {"username":"test","password":"test"}
    Response : { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjEwMDAifQ.Z8YLmH7dqFvBgWlKrCuPnDtSf9s5oNWaFvYe56"}


=> Create a new product
    URL: localhost:8080/addproduct
    Method: POST

    Headers:
    Content-Type: application/json
    Authorization: Bearer <jwt-token>
    
    Body:
    {
        "name": "Product name",
        "description": "This is a description of the product.",
        "price": 9.99, 
        "stockquantity":1
    }
    
    Response : {
        "productdetails": {
            "name": "Product name",
            "description": "This is a description of the product.",
            "price": 9.99, 
            "stockquantity":1
            "_id": "65be43109f4404183fedd6e6",
            "createdAt": "2024-02-03T13:43:44.081Z",
            "updatedAt": "2024-02-03T13:43:44.081Z",
            "__v": 0
        }
    }

=> Get all products
    URL: localhost:8080/product
    Method: GET

    Response: 
        {
            "name": "Product 1",
            "description": "Description for Product 1",
            "price": 10.99,
            "stockquantity": 5,
            "_id": "65beb7cdaaadcf183fddeaee"
        },
        ...
    

=> get a specific product by its id
    URL: localhost:8080/product/:productId
    Method: GET
    PathParam: ":id" - The ID of the product you want to retrieve.

    Response:  Same as getting all products but with only one object 

=> Update a product (You need to provide at least one field to update)
    URL: localhost:8080/product/:id
    Method: PUT
    Headers:
    Content-Type: application/json
    Authorization: Bearer <jwt-token>

    Body:  JSON Object that contains fields and new values for those fields. Example:
    {
        "price": 11.99
    }
    PathParam: ":id" - The ID of the product you want to update.
    
    Response:  
    {
        "message": "Product updated successfully!"
    }

=>  Delete a product
    URL: localhost:8080/deleteproduct
    Method: DELETE
    Headers:
    Content-Type: application/json
    Authorization: Bearer <jwt-token>

    Response: 
    {
    "message": {
        "acknowledged": true,
        "deletedCount": 1
    }
}

=> Delete a specific product by its id
    URL: localhost:8080/deleteproduct/:productId
    Method: DELETE

    Headers:
    Content-Type: application/json
    Authorization: Bearer <jwt-token>

    PathParams: ":id" - The ID of the product you want to delete.
   
    Response: {
    "message": "65be43109f4404183fedd6e6"
    }

6. Unit tests for the API endpoints are located in the tests directory. You can run the tests using the following command:
npm test
