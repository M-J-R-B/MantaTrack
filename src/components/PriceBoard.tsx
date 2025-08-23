import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { format } from 'date-fns';
import { isPriceStale } from '../data/mockData';
import PriceHistoryModal from './PriceHistoryModal';

const PriceBoard: React.FC = () => {
  const { priceEntries, vegetables, filters, setFilters, openModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique markets and vegetables for filters
  const markets = useMemo(() => {
    const uniqueMarkets = [...new Set(priceEntries.map(entry => entry.market))];
    return uniqueMarkets.sort();
  }, [priceEntries]);

  const vegetableNames = useMemo(() => {
    return vegetables.map(v => v.name).sort();
  }, [vegetables]);

  // Filter and sort price entries
  const filteredEntries = useMemo(() => {
    let filtered = [...priceEntries];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.vegetableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.market.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply vegetable filter
    if (filters.vegetable) {
      filtered = filtered.filter(entry => entry.vegetableName === filters.vegetable);
    }

    // Apply market filter
    if (filters.market) {
      filtered = filtered.filter(entry => entry.market === filters.market);
    }

    // Apply date filters
    if (filters.dateFrom) {
      filtered = filtered.filter(entry => entry.updatedAt >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(entry => entry.updatedAt <= filters.dateTo!);
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aValue = filters.sortBy === 'price' ? a.price : a.updatedAt.getTime();
        const bValue = filters.sortBy === 'price' ? b.price : b.updatedAt.getTime();
        
        if (filters.sortOrder === 'desc') {
          return bValue - aValue;
        }
        return aValue - bValue;
      });
    }

    return filtered;
  }, [priceEntries, searchTerm, filters]);

  const handleRowClick = (entry: any) => {
    openModal('priceHistory', entry);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  return (
    <div className="p-6">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Vegetable Price Board</h1>
          <p className="text-gray-600">Compare prices across different markets</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search vegetables, buyers, or markets..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="filters">
            <div className="filter-group">
              <label className="form-label">Vegetable</label>
              <select
                className="form-select"
                value={filters.vegetable || ''}
                onChange={(e) => setFilters({ vegetable: e.target.value || undefined })}
              >
                <option value="">All Vegetables</option>
                {vegetableNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">Market</label>
              <select
                className="form-select"
                value={filters.market || ''}
                onChange={(e) => setFilters({ market: e.target.value || undefined })}
              >
                <option value="">All Markets</option>
                {markets.map(market => (
                  <option key={market} value={market}>{market}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">Date From</label>
              <input
                type="date"
                className="form-input"
                value={filters.dateFrom ? format(filters.dateFrom, 'yyyy-MM-dd') : ''}
                onChange={(e) => setFilters({ dateFrom: e.target.value ? new Date(e.target.value) : undefined })}
              />
            </div>

            <div className="filter-group">
              <label className="form-label">Date To</label>
              <input
                type="date"
                className="form-input"
                value={filters.dateTo ? format(filters.dateTo, 'yyyy-MM-dd') : ''}
                onChange={(e) => setFilters({ dateTo: e.target.value ? new Date(e.target.value) : undefined })}
              />
            </div>

            <div className="filter-group">
              <label className="form-label">Sort By</label>
              <select
                className="form-select"
                value={`${filters.sortBy || ''}-${filters.sortOrder || 'asc'}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters({ 
                    sortBy: sortBy as 'price' | 'updatedAt' | undefined,
                    sortOrder: sortOrder as 'asc' | 'desc' | undefined
                  });
                }}
              >
                <option value="">Default</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="updatedAt-desc">Latest Updates</option>
                <option value="updatedAt-asc">Oldest Updates</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="form-label">&nbsp;</label>
              <button onClick={clearFilters} className="btn btn-outline w-full">
                <Filter size={16} />
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredEntries.length} of {priceEntries.length} price entries
        </p>
      </div>

      {/* Price Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Vegetable</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Buyer</th>
              <th>Market</th>
              <th>Last Updated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr 
                key={entry.id} 
                onClick={() => handleRowClick(entry)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="font-medium">{entry.vegetableName}</td>
                <td className="font-semibold text-green-600">
                  ₱{entry.price.toFixed(2)}
                </td>
                <td className="text-gray-600">{entry.unit}</td>
                <td>{entry.buyerName}</td>
                <td>{entry.market}</td>
                <td className="text-gray-600">
                  {format(entry.updatedAt, 'MMM dd, yyyy HH:mm')}
                </td>
                <td>
                  {isPriceStale(entry.updatedAt) ? (
                    <span className="badge badge-warning">Stale</span>
                  ) : (
                    <span className="badge badge-success">Fresh</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-8">
          <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No price entries found matching your criteria</p>
        </div>
      )}

      {/* Price History Modal */}
      <PriceHistoryModal />
    </div>
  );
};

export default PriceBoard;
