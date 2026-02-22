# ShopMe - E-Commerce Platform

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a modern UI, secure payment processing, and comprehensive product management.

## 🚀 Features

### User Features
- **User Authentication**: Local authentication and Google OAuth 2.0 integration
- **Product Browsing**: Browse and search through product catalog
- **Product Details**: View detailed product information with images
- **Shopping Cart**: Add, remove, and manage items in cart
- **Order Management**: Place orders and view order history
- **Secure Payments**: Stripe payment integration for secure transactions
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly interface using Material-UI and Tailwind CSS

### Technical Features
- **State Management**: Redux for predictable state management
- **Session Management**: Express sessions stored in MongoDB
- **Caching**: Redis integration for improved performance
- **Security**: 
  - Helmet.js for HTTP headers security
  - XSS protection
  - MongoDB sanitization
  - Rate limiting
  - Session security with cookies
- **Docker Support**: Containerized deployment ready
- **Email Notifications**: Nodemailer integration for order confirmations
- **Real-time Updates**: Toast notifications for user feedback

## 📁 Project Structure

```
ShopMe/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── cart/      # Shopping cart components
│   │   │   ├── details/   # Product detail components
│   │   │   ├── header/    # Navigation and search
│   │   │   ├── home/      # Home page components
│   │   │   ├── login/     # Authentication components
│   │   │   ├── Stripe/    # Payment components
│   │   │   └── footer/    # Footer component
│   │   ├── context/       # React Context API
│   │   ├── redux/         # Redux store, actions, reducers
│   │   │   ├── actions/   # Redux actions
│   │   │   ├── reducers/  # Redux reducers
│   │   │   └── constants/ # Action types
│   │   ├── service/       # API service layer
│   │   ├── utils/         # Utility functions
│   │   └── constants/     # App constants and data
│   └── package.json
│
└── server/                # Node.js/Express backend
    ├── config/            # Configuration files
    │   └── redis.config.js
    ├── controller/        # Route controllers
    │   ├── payment-controller.js
    │   ├── product-controller.js
    │   └── user-controller.js
    ├── database/          # Database connection
    │   └── db.js
    ├── middleware/        # Custom middleware
    │   └── userMiddleware.js
    ├── Model/             # Mongoose schemas
    │   ├── product-schema.js
    │   └── user-schema.js
    ├── routes/            # API routes
    │   └── route.js
    ├── constants/         # Server constants
    ├── defaultdata.js     # Seed data
    ├── passport.js        # Passport authentication config
    ├── server.js          # Entry point
    ├── Dockerfile         # Docker configuration
    ├── docker-compose.yml # Docker Compose setup
    └── package.json
```

## 🛠️ Technology Stack

### Frontend
- **React** (v18.2.0) - UI library
- **Redux & Redux Thunk** - State management
- **React Router DOM** - Client-side routing
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Stripe.js** - Payment processing
- **React Toastify** - Toast notifications
- **GSAP** - Animations
- **React Multi Carousel** - Product carousels

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
  - Local Strategy
  - Google OAuth 2.0
- **Stripe** - Payment gateway
- **Redis** - Caching layer
- **Nodemailer** - Email service
- **Express Session** - Session management
- **Morgan** - HTTP request logger

### Security & Middleware
- **Helmet** - Security headers
- **Express Mongo Sanitize** - NoSQL injection protection
- **XSS Clean** - Cross-site scripting protection
- **Express Rate Limit** - Rate limiting
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Nodemon** - Development auto-restart

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **Redis** (optional, for caching)
- **npm** or **yarn**
- **Docker** (optional, for containerized deployment)

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database
MONGODB_URL=your_mongodb_connection_string

# Server
PORT=3000
SECRET=your_session_secret

# Stripe
STRIPE_SECRET=your_stripe_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Application URL
URL=http://localhost:3000

# Email Service
MAIL_PASSWORD=your_mail_password

# Redis (Optional)
REDIS_URL=redis://localhost:6379

# Public Directory
PUBLIC_DIR=../client/build
```

## 🚀 Installation & Setup

### Option 1: Manual Setup

#### 1. Clone the repository
```bash
git clone <repository-url>
cd ShopMe
```

#### 2. Install server dependencies
```bash
cd server
npm install
```

#### 3. Install client dependencies
```bash
cd ../client
npm install
```

#### 4. Set up environment variables
Create a `.env` file in the server directory with the required variables (see Environment Variables section)

#### 5. Start MongoDB
Make sure MongoDB is running on your system

#### 6. Start Redis (Optional)
```bash
redis-server
```

#### 7. Run the application

**Development Mode:**

Terminal 1 - Start the backend:
```bash
cd server
npm run dev
```

Terminal 2 - Start the frontend:
```bash
cd client
npm start
```

The frontend will run on `http://localhost:3000` (or another port if 3000 is taken)
The backend will run on the port specified in your `.env` file

**Production Mode:**

First, build the client:
```bash
cd client
npm run build
```

Then start the server (it will serve the built client):
```bash
cd ../server
npm start
```

### Option 2: Docker Setup

#### 1. Configure environment variables
Create a `.env` file in the server directory with all required variables

#### 2. Build and run with Docker Compose
```bash
cd server
docker-compose up --build
```

The application will be available at `http://localhost:3000`

## 📱 Usage

### For Users
1. **Sign Up/Login**: Create an account or sign in with Google
2. **Browse Products**: Explore the product catalog on the home page
3. **View Details**: Click on any product to see detailed information
4. **Add to Cart**: Add desired items to your shopping cart
5. **Checkout**: Proceed to checkout and complete payment via Stripe
6. **View Orders**: Check your order history in the "My Orders" section

### For Developers
- The frontend communicates with the backend via REST APIs
- All API endpoints are defined in `server/routes/route.js`
- Redux store manages the application state for cart and products
- Protected routes require authentication
- Stripe handles all payment processing securely

## 🔑 API Endpoints

### User Routes
- `POST /signup` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /auth/google` - Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback

### Product Routes
- `GET /products` - Get all products
- `GET /product/:id` - Get product by ID

### Cart Routes
- `POST /cart/add` - Add item to cart
- `GET /cart` - Get user cart
- `DELETE /cart/:id` - Remove item from cart

### Order Routes
- `POST /payment/create-checkout-session` - Create Stripe checkout session
- `GET /orders` - Get user orders
- `POST /payment/webhook` - Stripe webhook endpoint

## 🔐 Security Features

- **Password Hashing**: Using passport-local-mongoose
- **Session Security**: HTTP-only cookies with secure flags
- **Input Sanitization**: Protection against NoSQL injection
- **XSS Protection**: Sanitizes user input to prevent cross-site scripting
- **Rate Limiting**: Prevents brute-force attacks
- **CORS**: Configured for secure cross-origin requests
- **Helmet**: Sets various HTTP headers for security

## 🧪 Testing

```bash
# Run tests for client
cd client
npm test

# Run tests for server
cd server
npm test
```

## 📦 Building for Production

### Build the client
```bash
cd client
npm run build
```

This creates an optimized production build in the `client/build` directory.

### Deploy
The server is configured to serve the built React app from the `build` directory. Simply start the server:

```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 👨‍💻 Author

**Adarsh Landge**






