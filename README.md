# Couture Inventory Dashboard

A modern, responsive inventory management web application for store managers. Built with React, Tailwind CSS, and Vite.

## 🚀 Live Demo
https://couture-three.vercel.app/

## 🛠️ Tech Stack
- **Frontend Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (via PostCSS)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 🏃‍♂️ How to Run Locally

1. **Clone the repository** (if applicable) or navigate to the project directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4.Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Features

1. **Inventory Overview**:
   - High-density table view for Desktop.
   - Optimized Card view for Mobile devices.
   - Sort by Price and Name.
   - Filter by Product Category.
   - Search functionality (Debounced).
   - Pagination support.

2. **Product Details**:
   - Comprehensive product information (Stock, Price, Rating, Discount).
   - Visual gallery.
   - **Customer Reviews**: Real-time customer feedback and ratings.
   - **Related Products**: Algorithmically fetches items from the same category.

3. **Catalogue Overview**:
   - Visual grid of all available product categories.
   - Drill-down navigation to filtered inventory view.

4. **Network Transparency**:
   - Real-time "Offline" alert if the device loses connection.
   - Skeleton loaders during data fetching.

## 📝 Assumptions & Decisions

- **State Management**: Given the scope, **React Local State + URL Search Params** was chosen over Redux. URL parameters ensure that filters and search results are shareable and persistent on reload.
- **Design System**: A custom configuration using Tailwind CSS was implemented to ensure a "Device Agnostic" and "Premium" feel, adhering to the "Zinc/Indigo" color palette.
- **Data Source**: The application uses [DummyJSON](https://dummyjson.com/) API.
  - *Note*: The `skip` and `limit` parameters are used for pagination.
- **Tailwind Version**: This project uses the latest Tailwind CSS v4.0 alpha/beta syntax (`@import "tailwindcss";`) configured via PostCSS for compatibility with standard Vite pipelines.

## 🧪 Deployment
To deploy to Vercel or Render:
1. Push this code to GitHub.
2. Connect the repository to Vercel/Render.
3. The build command `npm run build` and output directory `dist` are standard and pre-configured.
