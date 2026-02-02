# Student CRUD API

A basic Student Management API built with **TypeScript**, **Express**, and **MongoDB**. This project demonstrates a clean OOP layered architecture for academic purposes.

##  How to Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    - The project uses a default local MongoDB URI (`mongodb://localhost:27017/student-crud`).
    - If you want to customize it, copy `.env.example` to `.env` and update the values.

3.  **Run in Development Mode**
    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:8080`.

## Project Structure

The project follows a strict **Layered Architecture**:

-   **Controller** (`src/controllers`): Handles HTTP requests, validation, and responses.
-   **Service** (`src/services`): Contains business logic.
-   **Repository** (`src/repositories`): Handles direct database interactions.
-   **Model** (`src/models`): Mongoose schema definitions.
-   **Interface** (`src/interfaces`): TypeScript type definitions.

##  API Endpoints

### Base URL: `/students`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/students` | Create a new student |
| `GET` | `/students` | Get all students (supports pagination & search) |
| `GET` | `/students/:id` | Get a specific student by ID |
| `PUT` | `/students/:id` | Update a student's details |
| `DELETE` | `/students/:id` | Delete a student |

### Search & Pagination Example

GET `/students?page=1&limit=5&search=john`
