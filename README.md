<div>
<a href=""><img src="https://github.com/frozzel/auth.net-server/blob/e9eebc44b27af51f9d2dcef5e9c96b5d63479682/client/src/assets/authorize-net-logo.jpg" align="center" height="" width="100%" ></a></div>

# MERN Stack Authorize.Net Application

Welcome to the MERN Stack Authorize.Net Application! This application serves as an example of how to integrate the Authorize.Net payment gateway into a MERN (MongoDB, Express.js, React, Node.js) stack. 

## Screen Shots

![Screen Shots](https://github.com/frozzel/auth.net-server/blob/62a70d05a39cf90e85c6ab6950e7755bc90b1ef0/client/src/assets/Screenshot1.png)
![Screen Shots2](https://github.com/frozzel/auth.net-server/blob/62a70d05a39cf90e85c6ab6950e7755bc90b1ef0/client/src/assets/Screenshot2.png)

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

> [!NOTE]
>  [Authorize.net Api Docs](https://developer.authorize.net/api/reference/features/payment-transactions.html)


### Backend

Create a `.env` file in the `backend` directory and add the following variables:

> [!IMPORTANT]
> You must get your keys from your account settings at authorize.net 

```env
PORT=8080
AUTHORIZE_NET_API_LOGIN_ID=your_authorize_net_api_login_id
AUTHORIZE_NET_TRANSACTION_KEY=your_authorize_net_transaction_key
JWT_SECRET=your_jwt_secret
PAYMENT_REDIRECT=your_redirect_url
PAYMENT_CANCEL=your_cancel_url
```

### Frontend

Create a `.env` file in the `frontend` directory and add the following variable:

> [!TIP]
> This is not required but is useful in a production setting if using CRA not Vite

```env
VITE_REACT_APP_API_URL=http://localhost:5173
VITE_AUTHORIZE_NET_PUBLIC_CLIENT_KEY=your_key
```

## Usage

### Running the Backend Server

1. Navigate to the `main` directory:

   

2. Start the server:

   ```sh
   npm start
   ```

### Running the Frontend

1. Navigate to the `client` directory:

   ```sh
   cd ../client
   ```

2. Start the development server && client concurrently:

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



🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥