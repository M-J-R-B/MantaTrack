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
        buyerName: 'Demo Buyer',
        market: 'Manila Market',
        updatedAt: 'Dec 15, 2024 09:30',
        status: 'Fresh'
    },
    {
        id: '2',
        vegetableName: 'Potato',
        price: 35.00,
        unit: 'kg',
        buyerName: 'Metro Grocery Chain',
        market: 'Quezon City Market',
        updatedAt: 'Dec 14, 2024 14:20',
        status: 'Stale'
    },
    {
        id: '3',
        vegetableName: 'Onion',
        price: 60.00,
        unit: 'kg',
        buyerName: 'Seafood City',
        market: 'Makati Market',
        updatedAt: 'Dec 15, 2024 08:15',
        status: 'Fresh'
    },
    {
        id: '4',
        vegetableName: 'Carrot',
        price: 40.00,
        unit: 'kg',
        buyerName: 'Robinson\'s Supermarket',
        market: 'Manila Market',
        updatedAt: 'Dec 15, 2024 10:45',
        status: 'Fresh'
    },
    {
        id: '5',
        vegetableName: 'Cabbage',
        price: 25.00,
        unit: 'pc',
        buyerName: 'SM Hypermarket',
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
        
        alert('Login successful! Welcome back, Demo Buyer.');
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
    
    alert('Buyer account created successfully! Welcome to MantaTrack, ' + name);
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
        alert('Please login as a buyer to add purchase prices.');
        showPage('login');
        return;
    }
    
    document.getElementById('modal-title').textContent = 'Add New Purchase Price';
    document.getElementById('entry-vegetable').value = '';
    document.getElementById('entry-price').value = '';
    document.getElementById('entry-unit').value = 'kg';
    document.getElementById('entry-quantity').value = '';
    document.getElementById('entry-notes').value = '';
    
    // Clear editing ID for add mode
    delete document.getElementById('add-edit-modal').dataset.editingId;
    
    openModal('add-edit-modal');
}

function openEditModal(entryId) {
    if (!isAuthenticated) {
        alert('Please login as a buyer to edit purchase prices.');
        showPage('login');
        return;
    }
    
    // Find the entry (in a real app, this would be the user's entry)
    const entry = mockPriceEntries.find(e => e.id === entryId);
    if (entry) {
        document.getElementById('modal-title').textContent = 'Edit Purchase Price';
        document.getElementById('entry-vegetable').value = entry.vegetableName;
        document.getElementById('entry-price').value = entry.price;
        document.getElementById('entry-unit').value = entry.unit;
        
        // Store the entry ID for editing
        document.getElementById('add-edit-modal').dataset.editingId = entryId;
        
        openModal('add-edit-modal');
    }
}

function openBulkUpdateModal() {
    if (!isAuthenticated) {
        alert('Please login as a buyer to update purchase prices.');
        showPage('login');
        return;
    }
    
    // Populate the bulk update modal with current entries
    const tbody = document.querySelector('#bulk-update-modal tbody');
    if (tbody) {
        tbody.innerHTML = '';
        
        mockPriceEntries.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="font-medium">${entry.vegetableName}</td>
                <td class="text-gray-600">₱${entry.price.toFixed(2)}</td>
                <td>
                    <div class="relative">
                        <i class="fas fa-dollar-sign absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input type="number" step="0.01" min="0" class="form-input pl-8" value="${entry.price.toFixed(2)}" 
                               data-entry-id="${entry.id}" data-original-price="${entry.price.toFixed(2)}">
                    </div>
                </td>
                <td class="text-gray-600">${entry.unit}</td>
                <td><span class="bulk-status text-gray-500 text-sm">No change</span></td>
            `;
            tbody.appendChild(row);
            
            // Add event listener to detect price changes
            const input = row.querySelector('input[type="number"]');
            const statusSpan = row.querySelector('.bulk-status');
            
            input.addEventListener('input', function() {
                const originalPrice = parseFloat(this.dataset.originalPrice);
                const newPrice = parseFloat(this.value);
                
                if (newPrice !== originalPrice && newPrice > 0) {
                    statusSpan.innerHTML = '<span class="badge badge-success">Modified</span>';
                    this.classList.add('border-green-500', 'bg-green-50');
                } else {
                    statusSpan.innerHTML = 'No change';
                    this.classList.remove('border-green-500', 'bg-green-50');
                }
                
                updateBulkModalCounts();
            });
        });
        
        // Update the count in the footer
        const countSpan = document.querySelector('#bulk-update-modal .text-sm.text-gray-600');
        const saveButton = document.querySelector('#bulk-update-modal .btn-primary');
        if (countSpan) {
            countSpan.textContent = `0 of ${mockPriceEntries.length} entries will be updated`;
        }
        if (saveButton) {
            saveButton.innerHTML = '<i class="fas fa-save"></i> Save 0 Changes';
        }
    }
    
    openModal('bulk-update-modal');
}

function updateBulkModalCounts() {
    const inputs = document.querySelectorAll('#bulk-update-modal input[type="number"]');
    let changedCount = 0;
    
    inputs.forEach(input => {
        const originalPrice = parseFloat(input.dataset.originalPrice);
        const newPrice = parseFloat(input.value);
        if (newPrice !== originalPrice && newPrice > 0) {
            changedCount++;
        }
    });
    
    const countSpan = document.querySelector('#bulk-update-modal .text-sm.text-gray-600');
    const saveButton = document.querySelector('#bulk-update-modal .btn-primary');
    
    if (countSpan) {
        countSpan.textContent = `${changedCount} of ${inputs.length} entries will be updated`;
    }
    if (saveButton) {
        saveButton.innerHTML = `<i class="fas fa-save"></i> Save ${changedCount} Change${changedCount !== 1 ? 's' : ''}`;
    }
}

function handleSaveEntry(event) {
    if (event) event.preventDefault();
    
    const vegetable = document.getElementById('entry-vegetable').value;
    const price = document.getElementById('entry-price').value;
    const unit = document.getElementById('entry-unit').value;
    const quantity = document.getElementById('entry-quantity').value;
    const notes = document.getElementById('entry-notes').value;
    const modal = document.getElementById('add-edit-modal');
    const editingId = modal.dataset.editingId;
    
    if (!vegetable || !price || !unit) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const currentTime = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    if (editingId) {
        // Edit existing entry
        const entryIndex = mockPriceEntries.findIndex(e => e.id === editingId);
        if (entryIndex > -1) {
            mockPriceEntries[entryIndex] = {
                ...mockPriceEntries[entryIndex],
                vegetableName: vegetable,
                price: parseFloat(price),
                unit: unit,
                updatedAt: currentTime,
                status: 'Fresh'
            };
            alert('Purchase price updated successfully!');
        }
    } else {
        // Check if vegetable already exists for this user
        const existingEntry = mockPriceEntries.find(e => 
            e.vegetableName.toLowerCase() === vegetable.toLowerCase() && 
            e.buyerName === currentUser.name
        );
        
        if (existingEntry) {
            // Update existing entry instead of creating duplicate
            existingEntry.price = parseFloat(price);
            existingEntry.unit = unit;
            existingEntry.updatedAt = currentTime;
            existingEntry.status = 'Fresh';
            alert('Purchase price updated successfully!');
        } else {
            // Create new entry
            const newId = (Math.max(...mockPriceEntries.map(e => parseInt(e.id)), 0) + 1).toString();
            const newEntry = {
                id: newId,
                vegetableName: vegetable,
                price: parseFloat(price),
                unit: unit,
                buyerName: currentUser.name,
                market: currentUser.market,
                updatedAt: currentTime,
                status: 'Fresh'
            };
            mockPriceEntries.push(newEntry);
            alert('Purchase price added successfully!');
        }
    }
    
    // Update both tables and stats
    updatePriceTable(mockPriceEntries);
    updateDashboardTable(mockPriceEntries);
    updateDashboardStats(mockPriceEntries);
    
    closeModal('add-edit-modal');
}

function handleBulkUpdate() {
    console.log('Before bulk update:', mockPriceEntries.map(e => ({name: e.vegetableName, price: e.price})));
    
    // Get all price input fields from the bulk update modal
    const priceInputs = document.querySelectorAll('#bulk-update-modal input[type="number"]');
    const currentTime = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let updatedCount = 0;
    
    // Update prices based on the input fields
    priceInputs.forEach((input, index) => {
        if (index < mockPriceEntries.length) {
            const newPrice = parseFloat(input.value);
            const entry = mockPriceEntries[index];
            const oldPrice = entry.price;
            
            // Only update if the price has actually changed
            if (newPrice !== oldPrice && newPrice > 0) {
                entry.price = newPrice;
                entry.updatedAt = currentTime;
                entry.status = 'Fresh';
                updatedCount++;
                console.log(`Updated ${entry.vegetableName}: ${oldPrice} -> ${newPrice}`);
            }
        }
    });
    
    console.log('After bulk update:', mockPriceEntries.map(e => ({name: e.vegetableName, price: e.price})));
    console.log(`Total entries updated: ${updatedCount}`);
    
    // Clear any active filters first
    const searchInput = document.getElementById('search-input');
    const vegetableFilter = document.getElementById('vegetable-filter');
    const marketFilter = document.getElementById('market-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (searchInput) searchInput.value = '';
    if (vegetableFilter) vegetableFilter.value = '';
    if (marketFilter) marketFilter.value = '';
    if (sortFilter) sortFilter.value = '';
    
    // Update all tables and stats
    updatePriceTable(mockPriceEntries);
    updateDashboardTable(mockPriceEntries);
    updateDashboardStats(mockPriceEntries);
    
    if (updatedCount > 0) {
        alert(`Successfully updated ${updatedCount} price${updatedCount !== 1 ? 's' : ''}!`);
    } else {
        alert('No prices were changed.');
    }
    closeModal('bulk-update-modal');
}

function deleteVegetable(entryId) {
    if (!isAuthenticated) {
        alert('Please login as a buyer to delete purchase prices.');
        showPage('login');
        return;
    }
    
    // Find the entry
    const entry = mockPriceEntries.find(e => e.id === entryId);
    if (!entry) {
        alert('Entry not found.');
        return;
    }
    
    // Confirm deletion
    if (confirm(`Are you sure you want to delete the ${entry.vegetableName} purchase price?`)) {
        // Remove from mock data array
        const index = mockPriceEntries.findIndex(e => e.id === entryId);
        if (index > -1) {
            mockPriceEntries.splice(index, 1);
            
            // Update both tables and stats without page reload
            updatePriceTable(mockPriceEntries);
            updateDashboardTable(mockPriceEntries);
            updateDashboardStats(mockPriceEntries);
            
            alert('Purchase price deleted successfully!');
        }
    }
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
    console.log('updatePriceTable called with', entries.length, 'entries');
    const tbody = document.getElementById('price-table-body');
    const resultsCount = document.getElementById('results-count');
    
    if (!tbody) {
        console.log('price-table-body not found');
        return;
    }
    
    // Update results count
    if (resultsCount) resultsCount.textContent = entries.length;
    
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
    console.log('Price table updated with', tbody.children.length, 'rows');
}

function updateDashboardTable(entries) {
    console.log('updateDashboardTable called with', entries.length, 'entries');
    const tbody = document.getElementById('dashboard-table-body');
    
    if (!tbody) {
        console.log('dashboard-table-body not found - user might not be on dashboard');
        return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add new rows with action buttons
    entries.forEach(entry => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="font-medium">${entry.vegetableName}</td>
            <td class="font-semibold text-green-600">₱${entry.price.toFixed(2)}</td>
            <td class="text-gray-600">${entry.unit}</td>
            <td class="text-gray-600">100</td>
            <td class="text-gray-600">${entry.updatedAt}</td>
            <td><span class="badge badge-${entry.status === 'Fresh' ? 'success' : 'warning'}">${entry.status}</span></td>
            <td>
                <div class="flex gap-2">
                    <button onclick="openEditModal('${entry.id}')" class="btn btn-outline btn-sm">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button onclick="deleteVegetable('${entry.id}')" class="btn btn-outline btn-sm text-red-600 hover:bg-red-50">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    console.log('Dashboard table updated with', tbody.children.length, 'rows');
}

function updateDashboardStats(entries) {
    // Find stat cards by their icons or structure
    const statCards = document.querySelectorAll('.stat-card .stat-number');
    
    if (statCards.length < 4) return; // Not on dashboard page
    
    // Total Entries
    statCards[0].textContent = entries.length;
    
    // Average Price
    const avgPrice = entries.length > 0 
        ? entries.reduce((sum, entry) => sum + entry.price, 0) / entries.length 
        : 0;
    statCards[1].textContent = `₱${avgPrice.toFixed(2)}`;
    
    // Stale Prices
    const staleCount = entries.filter(entry => entry.status === 'Stale').length;
    statCards[2].textContent = staleCount;
    
    // Last Update
    if (entries.length > 0) {
        const latestEntry = entries.reduce((latest, entry) => {
            return new Date(entry.updatedAt) > new Date(latest.updatedAt) ? entry : latest;
        });
        const lastUpdate = new Date(latestEntry.updatedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        statCards[3].textContent = lastUpdate;
    } else {
        statCards[3].textContent = 'No data';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    updateAuthUI();
    
    // Initialize tables and stats
    updatePriceTable(mockPriceEntries);
    updateDashboardTable(mockPriceEntries);
    updateDashboardStats(mockPriceEntries);
    
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
