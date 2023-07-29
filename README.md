Smart Brain API
This is the backend API for the Smart Brain application, which allows for face recognition with sign-in and registration features. The API is built with Node.js and uses a PostgreSQL database to store user information and image data.

The frontend for this application can be found in the smarbrain-frontend branch.

Getting Started
To get started with the Smart Brain API, follow these instructions:

Clone the repository using git clone https://github.com/your-username/smart-brain-api.git.
Switch to the main branch using git checkout main.
Install the required dependencies using npm install.
Create a PostgreSQL database for the application and update the server.js file with your database information.
Start the server using npm start.
API Endpoints
The following endpoints are available in the Smart Brain API:

/signin
This endpoint is used to sign in to the application. It requires a username and password to be provided in the request body.

/register
This endpoint is used to register a new user for the application. It requires a username, password, and email to be provided in the request body.

/image
This endpoint is used to handle image recognition requests. It requires a valid user token to be provided in the request headers, along with an image URL in the request body.

/profile/:id
This endpoint is used to retrieve user profile information. It requires a valid user token to be provided in the request headers, and the user ID to be provided in the request URL.

Technologies Used
The Smart Brain API is built with the following technologies:

Node.js
Express.js
PostgreSQL
Knex.js
Contributing
Contributions to the Smart Brain API are welcome! To contribute, follow these steps:

Fork the repository.
Create a new branch for your changes.
Make your changes and commit them with descriptive commit messages.
Push your changes to your forked repository.
Create a pull request to merge your changes into the main branch.
