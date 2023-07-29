# Smart Brain - Face Recognition API

This is the backend server for the Smart Brain application, which is a web application that enables face recognition. It features user registration and sign in functionality, allowing registered users to save their recognition history.

The front-end application is built using React and can be found in the `smarbrain-frontend` branch of this repository.

## Getting Started

To get started, clone this repository and switch to the `main` branch:

```
git clone https://github.com/aakram9393/smart-brain-api.git
cd smart-brain-api
git checkout main
```

### Prerequisites

Make sure you have Node.js and npm installed on your system. You can download and install them from the official Node.js website: https://nodejs.org/

### Installing

To install the required dependencies, run the following command in the project root directory:

```
npm install
```

### Configuration

You will need to configure the application by setting the following environment variables:

- `DATABASE_URL`: The URL of your PostgreSQL database.
- `JWT_SECRET`: A secret key used to sign JSON Web Tokens.

You can set these environment variables by creating a `.env` file in the project root directory and adding the following lines:

```
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
```

Alternatively, you can set these environment variables directly on your system.

### Running

To start the application, run the following command in the project root directory:

```
npm start
```

The application will start listening on port `3000`.

## API Endpoints

The following endpoints are available in the API:

### `/signin` [POST]

Signs in the user with their email and password.

Request body:

```
{
  "email": "user@example.com",
  "password": "password"
}
```

Response body:

```
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "entries": 0,
  "joined": "2021-01-01T00:00:00.000Z"
}
```

### `/register` [POST]

Registers a new user with their name, email, and password.

Request body:

```
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password"
}
```

Response body:

```
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "entries": 0,
  "joined": "2021-01-01T00:00:00.000Z"
}
```

### `/profile/:id` [GET]

Retrieves the user profile for the specified user ID.

Request parameters:

- `id`: The ID of the user to retrieve.

Response body:

```
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "entries": 0,
  "joined": "2021-01-01T00:00:00.000Z"
}
```

### `/image` [PUT]

Increments the user's entry count and returns the new entry count.

Request body:

```
{
  "id": 1
}
```

Response body:

```
{
  "entries": 1
}
```
