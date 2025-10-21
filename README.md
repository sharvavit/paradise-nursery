# Paradise Nursery Shopping Application

A React-based e-commerce web application for browsing and purchasing houseplants. Built with React and Redux for state management.

## 🌿 Project Overview

Paradise Nursery is a front-end shopping application that allows users to browse a variety of houseplants, add them to a shopping cart, and manage their selections before checkout. The application demonstrates modern React development practices with Redux for centralized state management.

## ✨ Features

### Landing Page
- Attractive background image
- Company information and branding
- Call-to-action button to start shopping

### Product Listing Page
- Display of 6+ unique houseplants
- Plants organized into 3+ categories
- Each plant displays:
  - Thumbnail image
  - Plant name
  - Price
  - Add to Cart button
- Dynamic button states (disabled after adding to cart)

### Shopping Cart Page
- Real-time cart summary with total items and cost
- Detailed view of each plant in cart:
  - Thumbnail image
  - Plant name
  - Unit price
  - Quantity controls (increase/decrease)
  - Delete option
- Continue Shopping button
- Checkout button (Coming Soon)

### Header Navigation
- Present on all main pages
- Shopping cart icon with live item count
- Navigation between pages

## 🛠️ Technologies Used

- **React** - UI component library
- **Redux** - State management
- **React Router** - Navigation and routing
- **CSS3** - Styling and layouts
- **JavaScript (ES6+)** - Core programming language

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/sharvavit/paradise-nursery.git
```

2. Navigate to the project directory:
```bash
cd paradise-nursery
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and visit:
```
http://localhost:3000
```

## 📁 Project Structure

```
paradise-nursery/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LandingPage.js
│   │   ├── ProductList.js
│   │   ├── ShoppingCart.js
│   │   └── Header.js
│   ├── redux/
│   │   ├── store.js
│   │   ├── cartReducer.js
│   │   └── actions.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🎯 Redux State Management

The application uses Redux to manage the shopping cart state, including:
- Adding items to cart
- Removing items from cart
- Updating item quantities
- Calculating total price and item count

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📝 Assignment Requirements

This project fulfills the following requirements:
- ✅ GitHub repository (public, with Redux files)
- ✅ Landing page with background, company info, and CTA button
- ✅ Product listing with 6+ plants in 3+ categories
- ✅ Header with cart icon and navigation
- ✅ Shopping cart with full CRUD operations
- ✅ Dynamic cart calculations and updates

## 🤝 Contributing

This is an academic project. If you'd like to suggest improvements:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 👨‍💻 Author

**Sharvavit**
- GitHub: [@sharvavit](https://github.com/sharvavit)

## 📄 License

This project is created for educational purposes as part of a React/Redux course assignment.

## 🙏 Acknowledgments

- Plant images sourced from [mention your source]
- Inspired by modern e-commerce applications
- Built as part of React & Redux coursework

---

**Note**: The checkout functionality displays "Coming Soon" as this is a front-end demonstration project.
