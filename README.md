# MantaTrack - Vegetable Price Tracker

A modern web application for tracking and comparing vegetable prices across different markets. Built for buyers (market vendors, wholesalers) and farmers to efficiently manage and view vegetable pricing information.

## Features

### 🏠 Public Price Board (Homepage)
- **Comprehensive Price Table**: View all vegetable prices with columns for Vegetable, Price, Unit, Buyer, Market, and Last Updated
- **Advanced Filtering**: Filter by vegetable type, market/location, and date range
- **Search Functionality**: Search across vegetables, buyers, and markets
- **Smart Sorting**: Sort by price or update time (ascending/descending)
- **Price History**: Click any row to view detailed price history with interactive charts
- **Stale Price Detection**: Automatic "stale" badge for prices older than 48 hours

### 🔐 Buyer Authentication
- **Secure Login/Signup**: Complete authentication system with form validation
- **Demo Accounts**: Pre-configured demo accounts for testing
- **Session Management**: Persistent login state with localStorage

### 📊 Buyer Dashboard
- **Overview Statistics**: Number of vegetables listed, last update time, average prices
- **Quick Actions**: Add new vegetables and bulk update prices
- **Entry Management**: View, edit, and delete your price entries
- **Status Tracking**: Visual indicators for fresh vs stale prices

### ✏️ Add/Edit Vegetable Listing
- **Comprehensive Forms**: Vegetable selection, pricing, units, quantities, and notes
- **Form Validation**: Required field validation with error messages
- **Flexible Units**: Support for kg, pieces, and bundles
- **Optional Fields**: Available quantity and notes for additional context

### 🔄 Bulk Price Update
- **Inline Editing**: Edit multiple prices simultaneously in a table view
- **Change Tracking**: Visual indicators for modified prices
- **Batch Operations**: Update all changed prices with a single action
- **Progress Feedback**: Clear indication of what will be updated

### 📈 Price History Modal
- **Interactive Charts**: Line charts showing price trends over time
- **Detailed History**: Complete table of price changes with timestamps
- **Change Analysis**: Price differences and percentage changes
- **Additional Context**: Notes and quantity information

### 👤 Buyer Profile
- **Profile Management**: Edit business name, market, location, and contact info
- **Privacy Controls**: Toggle contact visibility for farmers
- **Account Information**: View account creation date and settings

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Custom CSS with responsive design
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting and manipulation
- **Routing**: React Router for navigation
- **State Management**: React Context API with useReducer

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MantaTrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Accounts

For testing purposes, the following demo accounts are available:

- **Email**: `contact@freshmarket.com` (any password)
- **Email**: `info@greengrocers.com` (any password)  
- **Email**: `hello@organicfoods.com` (any password)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── PriceBoard.tsx  # Main price board page
│   ├── Login.tsx       # Login form
│   ├── SignUp.tsx      # Registration form
│   ├── BuyerDashboard.tsx # Buyer dashboard
│   ├── BuyerProfile.tsx   # Profile management
│   ├── PriceHistoryModal.tsx # Price history modal
│   ├── AddEditModal.tsx     # Add/edit price entries
│   └── BulkUpdateModal.tsx  # Bulk price updates
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── AppContext.tsx  # Application state
├── data/              # Mock data and utilities
│   └── mockData.ts    # Sample data for development
├── types/             # TypeScript type definitions
│   └── index.ts       # Interface definitions
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── index.css          # Global styles
```

## Key Features Implementation

### Mobile-First Design
- Responsive layout that works on all device sizes
- Touch-friendly interface for mobile users
- Optimized table layouts for small screens

### Real-time Data Management
- Context-based state management for efficient updates
- Optimistic UI updates for better user experience
- Proper error handling and loading states

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly components
- High contrast color schemes

### Performance Optimizations
- Memoized components and calculations
- Efficient filtering and sorting algorithms
- Lazy loading for modals and charts

## Usage Guide

### For Buyers (Market Vendors/Wholesalers)

1. **Sign Up/Login**: Create an account or log in with existing credentials
2. **Add Price Entries**: Use the "Add New Vegetable" button to list your prices
3. **Update Prices**: Edit individual entries or use bulk update for multiple changes
4. **Manage Profile**: Update your business information and contact preferences
5. **Monitor Activity**: View dashboard statistics and track your listings

### For Farmers

1. **Browse Prices**: Visit the public price board to view all available prices
2. **Filter and Search**: Use filters to find specific vegetables or markets
3. **Compare Prices**: View price history to understand market trends
4. **Contact Buyers**: Reach out to buyers who have made their contact information visible

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **Type Definitions**: Extend `src/types/index.ts`
3. **Mock Data**: Update `src/data/mockData.ts`
4. **Styling**: Add to `src/index.css` or create component-specific styles

### State Management

The application uses React Context API with two main contexts:

- **AuthContext**: Manages user authentication and profile data
- **AppContext**: Handles price entries, filters, modals, and application state

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**MantaTrack** - Empowering the vegetable market with transparent pricing and efficient management tools.
