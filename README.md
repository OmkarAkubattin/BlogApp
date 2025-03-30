# Blog for Ominfy

This is the backend for the Blog application. It provides APIs for user authentication, blog management, and more.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Blog-for-Ominfy/Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.
   
## Deployment

- **Frontend**: [https://blog-app-one-tau-34.vercel.app](https://blog-app-one-tau-34.vercel.app)
- **Backend**: [https://blogapp-production-ba6b.up.railway.app](https://blogapp-production-ba6b.up.railway.app)

## API Routes

### Authentication Routes (`/api/auth`)

1. **POST `/signup`**
   - **Description**: Register a new user.
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

2. **POST `/login`**
   - **Description**: Log in an existing user.
   - **Request Body**:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "<jwt-token>",
       "userId": "<user-id>"
     }
     ```

3. **POST `/logout`**
   - **Description**: Log out the user.
   - **Response**:
     ```json
     {
       "message": "Logged out successfully"
     }
     ```

---

### Blog Routes (`/api/blogs`)

1. **GET `/`**
   - **Description**: Fetch all blogs.
   - **Response**:
     ```json
     [
       {
         "_id": "<blog-id>",
         "title": "Blog Title",
         "content": "Blog Content",
         "author": {
           "_id": "<author-id>",
           "name": "Author Name"
         },
         "createdAt": "2023-01-01T00:00:00.000Z",
         "updatedAt": "2023-01-01T00:00:00.000Z"
       }
     ]
     ```

2. **GET `/:id`**
   - **Description**: Fetch a blog by its ID.
   - **Response**:
     ```json
     {
       "_id": "<blog-id>",
       "title": "Blog Title",
       "content": "Blog Content",
       "author": "<author-id>",
       "createdAt": "2023-01-01T00:00:00.000Z",
       "updatedAt": "2023-01-01T00:00:00.000Z"
     }
     ```

3. **POST `/`**
   - **Description**: Create a new blog (requires authentication).
   - **Request Headers**:
     ```
     Authorization: Bearer <jwt-token>
     ```
   - **Request Body**:
     ```json
     {
       "title": "New Blog Title",
       "content": "New Blog Content"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "<blog-id>",
       "title": "New Blog Title",
       "content": "New Blog Content",
       "author": "<author-id>",
       "createdAt": "2023-01-01T00:00:00.000Z",
       "updatedAt": "2023-01-01T00:00:00.000Z"
     }
     ```

4. **DELETE `/:id`**
   - **Description**: Delete a blog by its ID (requires authentication and ownership).
   - **Request Headers**:
     ```
     Authorization: Bearer <jwt-token>
     ```
   - **Response**:
     ```json
     {
       "message": "Blog deleted successfully"
     }
     ```

5. **PUT `/:id`**
   - **Description**: Update a blog by its ID (requires authentication and ownership).
   - **Request Headers**:
     ```
     Authorization: Bearer <jwt-token>
     ```
   - **Request Body**:
     ```json
     {
       "title": "Updated Blog Title",
       "content": "Updated Blog Content"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Blog updated",
       "blog": {
         "_id": "<blog-id>",
         "title": "Updated Blog Title",
         "content": "Updated Blog Content",
         "author": "<author-id>",
         "createdAt": "2023-01-01T00:00:00.000Z",
         "updatedAt": "2023-01-01T00:00:00.000Z"
       }
     }
     ```

---

## Middleware

- **Authentication Middleware**: Ensures that routes requiring authentication are accessed only by logged-in users. It verifies the JWT token and attaches the user information to the `req` object.

---

## Database Models

1. **User**
   - Fields:
     - `name`: String (required)
     - `email`: String (required, unique)
     - `password`: String (required)
   - Timestamps: `createdAt`, `updatedAt`

2. **Blog**
   - Fields:
     - `title`: String (required)
     - `content`: String (required)
     - `author`: ObjectId (reference to `User`)
   - Timestamps: `createdAt`, `updatedAt`

---

## Notes

- Ensure that the `MONGO_URI` in the `.env` file points to a valid MongoDB instance.
- The JWT token expires in 1 hour by default. You can modify this in the `authController.js` file.

Feel free to contribute or raise issues for improvements!
