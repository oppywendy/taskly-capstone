# Taskly

Taskly is a powerful task management API designed to help organizations and teams effectively manage their tasks and boards. With Taskly, users can create, update, and organize tasks across various boards within their organization, promoting productivity and collaboration.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

Taskly is an API-first task management application built to help organizations streamline their task workflows. It enables users to manage boards and tasks, assign tasks to team members, and track progress within an organization. Taskly is designed for scalability, efficiency, and collaboration.

## Features

- **User Authentication**: Secure user registration and login functionality.
- **Organization Management**: Create and manage organizations to keep teams and tasks organized.
- **Boards**: Create, update, and delete task boards within an organization.
- **Task Management**: Add, update, delete, and retrieve tasks within a board.
- **Role-Based Access Control**: Restrict access to certain actions based on user roles.
- **Caching with Redis**: Improve performance with Redis caching for frequently requested data.
- **Error Handling and Validation**: Comprehensive input validation and structured error responses.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for creating the API routes.
- **PostgreSQL**: Relational database for storing user, board, and task data.
- **Redis**: Caching layer to improve API performance.
- **Sequelize**: ORM for database management.
- **OpenAPI/Swagger**: API documentation and design specification.
- **Jest**: Testing framework for unit and integration tests.

## Installation

Follow these steps to set up Taskly on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/taskly.git
   ```
2. Navigate to the project directory
  ```bash
   cd taskly
   ```
3. Install the dependencies:
 ```bash
   npm install
```
4. Set up the PostgreSQL database:
   Ensure that PostgreSQL is installed and running on your local machine. Create a new database for the project.
5. Set up Redis:

Install and run Redis on your machine to enable caching.

Environment Variables
Create a .env file in the root directory with the following variables:

```bash
Copy code
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/taskly_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```
Replace user, password, and taskly_db with your PostgreSQL credentials.
Set a secure JWT_SECRET.
Running the Project
To start the application:

```bash
Copy code
npm run start
```
Your API will be available at http://localhost:5000.

**API Documentation**
Taskly follows the OpenAPI 3.0 specification, and you can find the full API documentation here.

# API Documentation

Taskly follows the OpenAPI 3.0 specification. Below are the main endpoints for the Taskly API:

## Example Endpoints

### **Auth**

- **POST** `/api/auth/register`: Register a new user.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "organization": "string"
    }
    ```
  - **Response:**
    - `201`: Registration successful.
    - `400`: Invalid input, please check the provided data.

- **POST** `/api/auth/login`: Log in a user.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - `200`: Login successful.
    - `401`: Unauthorized, incorrect credentials.

### **Organizations**

- **POST** `/api/organizations`: Register a new organization.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - **Response:**
    - `201`: Organization registered successfully.
    - `400`: Error in request, please verify input.
    - `401`: Access denied, authentication needed.

- **POST** `/api/{organizationId}/addUser`: Add a user to an organization.
  - **Parameters:**
    - `organizationId`: The ID of the organization.
  - **Request Body:**
    ```json
    {
      "userId": "string"
    }
    ```
  - **Response:**
    - `201`: User successfully assigned to the organization.
    - `400`: Bad request, check input data.
    - `401`: Unauthorized access, please authenticate.
    - `404`: User not found.

### **Boards**

- **POST** `/api/organizations/{organizationId}/boards`: Create a board within an organization.
  - **Parameters:**
    - `organizationId`: The ID of the organization.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
  - **Response:**
    - `201`: Board created successfully.
    - `400`: Bad request, check input data.
    - `401`: Unauthorized access, please authenticate.

- **GET** `/api/organizations/{organizationId}/boards`: Get all boards within an organization.
  - **Parameters:**
    - `organizationId`: The ID of the organization.
  - **Response:**
    - `200`: Success, returns all boards.
    - `401`: Unauthorized access, please authenticate.

- **PUT** `/api/boards/{id}`: Update a specific board.
  - **Parameters:**
    - `id`: The ID of the board to update.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
  - **Response:**
    - `200`: Board updated successfully.
    - `400`: Bad request, check input data.
    - `401`: Unauthorized access, please authenticate.
    - `404`: Board not found.

- **DELETE** `/api/boards/{id}`: Delete a specific board.
  - **Parameters:**
    - `id`: The ID of the board to delete.
  - **Response:**
    - `200`: Board deleted successfully.
    - `401`: Unauthorized access, please authenticate.
    - `404`: Board not found.

### **Tasks**

- **POST** `/api/boards/{boardId}/tasks`: Create a task within a board.
  - **Parameters:**
    - `boardId`: The ID of the board.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
  - **Response:**
    - `201`: Task created successfully.
    - `400`: Bad request, check input data.
    - `401`: Unauthorized access, please authenticate.

- **GET** `/api/boards/{boardId}/tasks`: Get all tasks within a board.
  - **Parameters:**
    - `boardId`: The ID of the board.
  - **Response:**
    - `200`: Success, returns all tasks.
    - `401`: Unauthorized access, please authenticate.

- **PUT** `/api/tasks/{taskId}`: Update a specific task.
  - **Parameters:**
    - `taskId`: The ID of the task to update.
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
  - **Response:**
    - `200`: Task updated successfully.
    - `400`: Bad request, check input data.
    - `401`: Unauthorized access, please authenticate.
    - `404`: Task not found.

- **DELETE** `/api/tasks/{taskId}`: Delete a specific task.
  - **Parameters:**
    - `taskId`: The ID of the task to delete.
  - **Response:**
    - `200`: Task deleted successfully.
    - `401`: Unauthorized access, please authenticate.
    - `404`: Task not found.

   
