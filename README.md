# MantaTrack - Vegetable Price Tracker

A lightweight web application for tracking and comparing vegetable prices in Mantalongon, Dalaguete. Built as a simple static website for easy deployment and fast performance.

## Features

### 🏠 Public Price Board (Homepage)
- **Comprehensive Price Table**: View all vegetable prices with columns for Vegetable, Price, Unit, Buyer, Market, and Last Updated
- **Advanced Filtering**: Filter by vegetable type, market/location, and date range
- **Search Functionality**: Search across vegetables, buyers, and markets
- **Smart Sorting**: Sort by price or update time (ascending/descending)
- **Price History**: Click any row to view detailed price history
- **Stale Price Detection**: Automatic "stale" badge for prices older than 48 hours

### 🔐 Buyer Authentication
- **Simple Login/Signup**: Authentication system with form validation
- **Demo Account**: Pre-configured demo account for testing (demo@example.com / demo123)
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

### 📈 Price History Modal
- **Detailed History**: Complete table of price changes with timestamps
- **Change Analysis**: Price differences and percentage changes
- **Additional Context**: Notes and quantity information

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome for consistent iconography
- **Fonts**: Inter font family from Google Fonts
- **No build process**: Direct deployment of static files

## Getting Started

### Prerequisites
- Any modern web browser
- A web server (for local development)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MantaTrack
   ```

2. **Start a local web server**
   
   **Option 1: Python**
   ```bash
   python -m http.server 3000
   ```
   
   **Option 2: Node.js (if available)**
   ```bash
   npx serve .
   ```
   
   **Option 3: Any other static file server**

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Account

For testing the buyer features:
- **Email**: `demo@example.com`
- **Password**: `demo123`

## Project Structure

```
MantaTrack/
├── index.html          # Main application file
├── styles.css          # All styling and responsive design
├── script.js           # All JavaScript functionality
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

## Key Features Implementation

### Mobile-First Design
- Responsive layout that works on all device sizes
- Touch-friendly interface for mobile users
- Optimized layouts for small screens

### Lightweight Performance
- No framework overhead
- Fast loading times
- Works on any device or connection

### Easy Deployment
- No build process required
- Deploy anywhere: GitHub Pages, Netlify, any web server
- Works offline after initial load

### Cross-Browser Compatibility
- Works on all modern browsers
- Progressive enhancement approach
- Graceful degradation for older browsers

## Usage Guide

### For Buyers (Market Vendors/Wholesalers)

1. **Login**: Use the demo account or create a new account
2. **Add Price Entries**: Use the "Add New Vegetable" button to list your prices
3. **Update Prices**: Edit individual entries or use bulk update for multiple changes
4. **Monitor Activity**: View dashboard statistics and track your listings

### For Farmers and Public Users

1. **Browse Prices**: Visit the price board to view all available prices
2. **Filter and Search**: Use filters to find specific vegetables or markets
3. **Compare Prices**: View price history to understand market trends
4. **No Registration Required**: Public access to price information

## Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch as source
4. Access via: `https://username.github.io/repository-name`

### Netlify
1. Connect repository to Netlify
2. Deploy automatically on push
3. Custom domain support available

### Traditional Web Hosting
1. Upload all files to web server
2. Ensure `index.html` is in root directory
3. Access via your domain

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Notes

### Adding New Features
- All HTML structure is in `index.html`
- All styling is in `styles.css`
- All JavaScript functionality is in `script.js`
- Use vanilla JavaScript for consistency

### Data Storage
- Currently uses mock data in JavaScript
- Local storage for user sessions
- Easy to integrate with APIs or databases later

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Test in multiple browsers
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

---

**MantaTrack** - Simple, fast, and effective vegetable price tracking for Mantalongon, Dalaguete.