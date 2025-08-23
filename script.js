// Global state
let currentUser = null;
let isAuthenticated = false;

// Mock data
const mockPriceEntries = [
    {
        id: '1',
        vegetableName: 'Tomato',
        price: 45.00,
        unit: 'kg',
        buyerName: 'Fresh Market Co.',
        market: 'Manila Market',
        updatedAt: 'Dec 15, 2024 09:30',
        status: 'Fresh'
    },
    {
        id: '2',
        vegetableName: 'Potato',
        price: 35.00,
        unit: 'kg',
        buyerName: 'Green Grocers',
        market: 'Quezon City Market',
        updatedAt: 'Dec 14, 2024 14:20',
        status: 'Stale'
    },
    {
        id: '3',
        vegetableName: 'Onion',
        price: 60.00,
        unit: 'kg',
        buyerName: 'Farm Fresh Supply',
        market: 'Makati Market',
        updatedAt: 'Dec 15, 2024 08:15',
        status: 'Fresh'
    },
    {
        id: '4',
        vegetableName: 'Carrot',
        price: 40.00,
        unit: 'kg',
        buyerName: 'Organic Market',
        market: 'Manila Market',
        updatedAt: 'Dec 15, 2024 10:45',
        status: 'Fresh'
    },
    {
        id: '5',
        vegetableName: 'Cabbage',
        price: 25.00,
        unit: 'pc',
        buyerName: 'Fresh Market Co.',
        market: 'Quezon City Market',
        updatedAt: 'Dec 14, 2024 16:30',
        status: 'Stale'
    }
];

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Update active nav link
    if (pageId === 'price-board') {
        document.querySelector('a[href="#price-board"]').classList.add('active');
    } else if (pageId === 'dashboard') {
        document.querySelector('a[href="#dashboard"]').classList.add('active');
    }
}

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Demo login
    if (email === 'demo@example.com' && password === 'demo123') {
        currentUser = {
            name: 'Demo User',
            email: email,
            market: 'Manila Market',
            location: 'Manila'
        };
        isAuthenticated = true;
        
        // Update UI
        updateAuthUI();
        
        // Redirect to dashboard
        showPage('dashboard');
        
        // Clear form
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        
        alert('Login successful! Welcome back, Demo User.');
    } else {
        alert('Invalid credentials. Please use the demo account: demo@example.com / demo123');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const market = document.getElementById('signup-market').value;
    const location = document.getElementById('signup-location').value;
    const contactVisible = document.getElementById('signup-contact-visible').checked;
    
    // Create new user
    currentUser = {
        name: name,
        email: email,
        market: market,
        location: location,
        contactVisible: contactVisible
    };
    isAuthenticated = true;
    
    // Update UI
    updateAuthUI();
    
    // Redirect to dashboard
    showPage('dashboard');
    
    // Clear form
    document.getElementById('signup-name').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-market').value = '';
    document.getElementById('signup-location').value = '';
    document.getElementById('signup-contact-visible').checked = false;
    
    alert('Account created successfully! Welcome to MantaTrack, ' + name);
}

function logout() {
    currentUser = null;
    isAuthenticated = false;
    
    // Update UI
    updateAuthUI();
    
    // Redirect to price board
    showPage('price-board');
    
    alert('Logged out successfully.');
}

function updateAuthUI() {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const dashboardUserName = document.getElementById('dashboard-user-name');
    
    if (isAuthenticated && currentUser) {
        // Hide login/signup links
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        
        // Show user info
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.name;
        dashboardUserName.textContent = currentUser.name;
        
        // Add dashboard link
        if (!document.querySelector('a[href="#dashboard"]')) {
            const dashboardLink = document.createElement('a');
            dashboardLink.href = '#dashboard';
            dashboardLink.className = 'nav-link';
            dashboardLink.innerHTML = '<i class="fas fa-chart-bar"></i> Dashboard';
            dashboardLink.onclick = () => showPage('dashboard');
            
            const navLinks = document.querySelector('.nav-links');
            navLinks.insertBefore(dashboardLink, userInfo);
        }
    } else {
        // Show login/signup links
        loginLink.style.display = 'flex';
        signupLink.style.display = 'flex';
        
        // Hide user info
        userInfo.style.display = 'none';
        
        // Remove dashboard link
        const dashboardLink = document.querySelector('a[href="#dashboard"]');
        if (dashboardLink) {
            dashboardLink.remove();
        }
    }
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openPriceHistory(entryId) {
    // Find the entry
    const entry = mockPriceEntries.find(e => e.id === entryId);
    if (entry) {
        // Update modal title
        document.querySelector('#price-history-modal .modal-title').textContent = 
            `Price History - ${entry.vegetableName}`;
        
        // Update current price info
        document.querySelector('#price-history-modal .text-2xl').textContent = 
            `₱${entry.price.toFixed(2)}`;
        
        openModal('price-history-modal');
    }
}

function openAddModal() {
    if (!isAuthenticated) {
        alert('Please login to add price entries.');
        showPage('login');
        return;
    }
    
    document.getElementById('modal-title').textContent = 'Add New Price Entry';
    document.getElementById('entry-vegetable').value = '';
    document.getElementById('entry-price').value = '';
    document.getElementById('entry-unit').value = 'kg';
    document.getElementById('entry-quantity').value = '';
    document.getElementById('entry-notes').value = '';
    
    openModal('add-edit-modal');
}

function openEditModal(entryId) {
    if (!isAuthenticated) {
        alert('Please login to edit price entries.');
        showPage('login');
        return;
    }
    
    // Find the entry (in a real app, this would be the user's entry)
    const entry = mockPriceEntries.find(e => e.id === entryId);
    if (entry) {
        document.getElementById('modal-title').textContent = 'Edit Price Entry';
        document.getElementById('entry-vegetable').value = entry.vegetableName;
        document.getElementById('entry-price').value = entry.price;
        document.getElementById('entry-unit').value = entry.unit;
        
        openModal('add-edit-modal');
    }
}

function openBulkUpdateModal() {
    if (!isAuthenticated) {
        alert('Please login to update prices.');
        showPage('login');
        return;
    }
    
    openModal('bulk-update-modal');
}

function handleSaveEntry(event) {
    if (event) event.preventDefault();
    
    const vegetable = document.getElementById('entry-vegetable').value;
    const price = document.getElementById('entry-price').value;
    const unit = document.getElementById('entry-unit').value;
    const quantity = document.getElementById('entry-quantity').value;
    const notes = document.getElementById('entry-notes').value;
    
    if (!vegetable || !price || !unit) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real app, this would save to a database
    alert('Price entry saved successfully!');
    closeModal('add-edit-modal');
}

function handleBulkUpdate() {
    // In a real app, this would update multiple prices
    alert('Prices updated successfully!');
    closeModal('bulk-update-modal');
}

// Search and filter functions
function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('vegetable-filter').value = '';
    document.getElementById('market-filter').value = '';
    document.getElementById('sort-filter').value = '';
    
    // Reset table to show all entries
    updatePriceTable(mockPriceEntries);
}

function updatePriceTable(entries) {
    const tbody = document.getElementById('price-table-body');
    const resultsCount = document.getElementById('results-count');
    
    // Update results count
    resultsCount.textContent = entries.length;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add new rows
    entries.forEach(entry => {
        const row = document.createElement('tr');
        row.className = 'cursor-pointer hover:bg-gray-50';
        row.onclick = () => openPriceHistory(entry.id);
        
        row.innerHTML = `
            <td class="font-medium">${entry.vegetableName}</td>
            <td class="font-semibold text-green-600">₱${entry.price.toFixed(2)}</td>
            <td class="text-gray-600">${entry.unit}</td>
            <td>${entry.buyerName}</td>
            <td>${entry.market}</td>
            <td class="text-gray-600">${entry.updatedAt}</td>
            <td><span class="badge badge-${entry.status === 'Fresh' ? 'success' : 'warning'}">${entry.status}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    updateAuthUI();
    
    // Set up search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredEntries = mockPriceEntries.filter(entry =>
            entry.vegetableName.toLowerCase().includes(searchTerm) ||
            entry.buyerName.toLowerCase().includes(searchTerm) ||
            entry.market.toLowerCase().includes(searchTerm)
        );
        updatePriceTable(filteredEntries);
    });
    
    // Set up filter functionality
    const vegetableFilter = document.getElementById('vegetable-filter');
    const marketFilter = document.getElementById('market-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    function applyFilters() {
        let filteredEntries = [...mockPriceEntries];
        
        // Apply vegetable filter
        if (vegetableFilter.value) {
            filteredEntries = filteredEntries.filter(entry => 
                entry.vegetableName === vegetableFilter.value
            );
        }
        
        // Apply market filter
        if (marketFilter.value) {
            filteredEntries = filteredEntries.filter(entry => 
                entry.market === marketFilter.value
            );
        }
        
        // Apply sorting
        if (sortFilter.value) {
            const [sortBy, sortOrder] = sortFilter.value.split('-');
            
            filteredEntries.sort((a, b) => {
                let aValue, bValue;
                
                if (sortBy === 'price') {
                    aValue = a.price;
                    bValue = b.price;
                } else if (sortBy === 'date') {
                    // Simple date comparison (in real app, use proper date parsing)
                    aValue = new Date(a.updatedAt).getTime();
                    bValue = new Date(b.updatedAt).getTime();
                }
                
                if (sortOrder === 'desc') {
                    return bValue - aValue;
                }
                return aValue - bValue;
            });
        }
        
        updatePriceTable(filteredEntries);
    }
    
    vegetableFilter.addEventListener('change', applyFilters);
    marketFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // Prevent modal close when clicking inside modal
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            if (overlay.style.display === 'flex') {
                overlay.style.display = 'none';
            }
        });
    }
});
