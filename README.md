


# Gadget Galaxy - Backend

This is the backend repository for the Gadget Galaxy website. The backend is built using Node.js, Express.js, and MongoDB. It handles product data retrieval, searching, filtering, sorting, and pagination.

## Features

- RESTful API for products
- Product filtering by category and brand
- Product search functionality
- Sorting by price, date, etc.
- Pagination support

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gadget-galaxy-backend.git
   cd gadget-galaxy-backend
   
2. Install the dependencies:

   ```bash
   npm install
   
or if you use Yarn:
  ```bash
    yarn install
```
### Running the Project Locally

1. Set up your MongoDB database and obtain the connection URI.
2. Create a .env file in the root directory and add the following environment variables:
   
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string

3. Start the development server:

         npm start

or with Yarn:
                  
         yarn start

4. The API will be available at http://localhost:5000.

### API Endpoints

- GET /products: Retrieve all products with pagination, filtering, and sorting.
- GET /products/
: Retrieve a single product by ID.
- GET /products/search: Search for products by keyword.

### Deployment

To deploy the backend, use platforms like Vercel, Heroku, or any other Node.js hosting service.
