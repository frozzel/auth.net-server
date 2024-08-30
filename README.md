<div>
<a href=""><img src="https://github.com/frozzel/auth.net-server/blob/62a70d05a39cf90e85c6ab6950e7755bc90b1ef0/client/src/assets/Screenshot1.png" align="center" height="" width="50%" ></a></div>
<div>
<a href=""><img src="https://github.com/frozzel/auth.net-server/blob/62a70d05a39cf90e85c6ab6950e7755bc90b1ef0/client/src/assets/Screenshot2.png" align="center" height="" width="50%" ></a></div>

# MERN Stack Authorize.Net Application

Welcome to the MERN Stack Authorize.Net Application! This application serves as an example of how to integrate the Authorize.Net payment gateway into a MERN (MongoDB, Express.js, React, Node.js) stack. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This application provides a simple way to integrate and test Authorize.Net payment processing in a MERN stack project. You can use this as a base or reference for your own projects that require payment handling.

## Features

- Secure payment processing via Authorize.Net
- User authentication and management
- Responsive UI using React
- RESTful API using Express.js
- Form validation
- Transaction history

## Installation

Before you begin, ensure you have the following installed:
- Node.js
- MongoDB

### Backend

1. Clone the repository:
     ```sh
   git clone https://github.com/yourusername/mern-authorize-net.git
   cd mern-authorize-net
   ```

   2. Install dependencies:

   ```sh
   cd backend
   npm install
   ```

### Frontend

1. Navigate to the `frontend` directory and install dependencies:

   ```sh
   cd ../frontend
   npm install
   ```

## Configuration

To configure the application, you will need to set up environment variables for both the backend and the frontend.

### Backend

Create a `.env` file in the `backend` directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
AUTHORIZE_NET_API_LOGIN_ID=your_authorize_net_api_login_id
AUTHORIZE_NET_TRANSACTION_KEY=your_authorize_net_transaction_key
JWT_SECRET=your_jwt_secret
```

### Frontend

Create a `.env` file in the `frontend` directory and add the following variable:

```env
REACT_APP_API_URL=http://localhost:5000
```

## Usage

### Running the Backend Server

1. Navigate to the `main` directory:

   

2. Start the server:

   ```sh
   npm start or npm run dev 
   ```

### Running the Frontend

1. Navigate to the `client` directory:

   ```sh
   cd ../client
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

The application should now be running. Open your browser and navigate to `http://localhost:8080` to see the application in action.

## Technologies Used

- **Express.js**: Web framework for Node.js
- **React**: Frontend library for building user interfaces
- **Node.js**: JavaScript runtime for the backend
- **Authorize.Net**: Payment gateway
- **JWT**: JSON Web Tokens for authentication

## Contributing

We welcome contributions from the community! 

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request

## License

  [![Github license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Contact

If you have any questions, feel free to reach out!

  Created by: [@frozzel](https://github.com/frozzel)
  
  Please contact me with questions at: [@frozzel](mailto:frozzel@me.com)
