
# Boat Co Frontend

This is the frontend application for Boat Co, built with Vue.js and Vuetify.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Version: 23.9.0)
- [npm](https://www.npmjs.com/) (Version: 10.9.2)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/davidgrigorianc/boat-co-frontend.git
   cd boat-co-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project with the following variables:

   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   VITE_APP_STRIPE_KEY=your-stripe-key-here
   ```

   Replace `your-stripe-key-here` with your actual Stripe public key.

   ## Development
   
   To run the application in development mode:
   
   ```bash
   npm run dev
   ```
   
   This will start the development server, and you can open the app in your browser at `http://localhost:3000`.
   
   ## Build
   
   To build the application for production:
   
   ```bash
   npm run build
   ```

   To preview the built application locally:

   ```bash
   npm run preview
   ```