import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { format } from 'date-fns';
import { 
  Plus, 
  Edit3, 
  BarChart3, 
  Package, 
  Clock, 
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';
import AddEditModal from './AddEditModal';
import BulkUpdateModal from './BulkUpdateModal';

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { priceEntries, openModal } = useApp();

  // Get user's price entries
  const userEntries = useMemo(() => {
    return priceEntries.filter(entry => entry.buyerId === user?.id);
  }, [priceEntries, user?.id]);

  // Calculate dashboard stats
  const stats = useMemo(() => {
    const totalEntries = userEntries.length;
    const lastUpdate = userEntries.length > 0 
      ? Math.max(...userEntries.map(entry => entry.updatedAt.getTime()))
      : null;
    
    const staleEntries = userEntries.filter(entry => {
      const hoursDiff = (new Date().getTime() - entry.updatedAt.getTime()) / (1000 * 60 * 60);
      return hoursDiff > 48;
    }).length;

    const totalValue = userEntries.reduce((sum, entry) => sum + entry.price, 0);
    const avgPrice = totalEntries > 0 ? totalValue / totalEntries : 0;

    return {
      totalEntries,
      lastUpdate,
      staleEntries,
      avgPrice,
    };
  }, [userEntries]);

  const handleAddNew = () => {
    openModal('addEdit');
  };

  const handleBulkUpdate = () => {
    openModal('bulkUpdate');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="card mb-6">
        <div className="card-header">
          <div>
            <h1 className="card-title">Buyer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddNew} className="btn btn-primary">
              <Plus size={16} />
              Add New Vegetable
            </button>
            <button onClick={handleBulkUpdate} className="btn btn-secondary">
              <Edit3 size={16} />
              Update Prices
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats mb-6">
        <div className="stat-card">
          <Package size={32} className="mx-auto text-blue-600 mb-2" />
          <div className="stat-number">{stats.totalEntries}</div>
          <div className="stat-label">Vegetables Listed</div>
        </div>

        <div className="stat-card">
          <DollarSign size={32} className="mx-auto text-green-600 mb-2" />
                          <div className="stat-number">₱{stats.avgPrice.toFixed(2)}</div>
          <div className="stat-label">Average Price</div>
        </div>

        <div className="stat-card">
          <Clock size={32} className="mx-auto text-orange-600 mb-2" />
          <div className="stat-number">{stats.staleEntries}</div>
          <div className="stat-label">Stale Prices</div>
        </div>

        <div className="stat-card">
          <Calendar size={32} className="mx-auto text-purple-600 mb-2" />
          <div className="stat-number">
            {stats.lastUpdate ? format(new Date(stats.lastUpdate), 'MMM dd') : 'N/A'}
          </div>
          <div className="stat-label">Last Update</div>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Your Price Entries</h2>
          <div className="text-sm text-gray-600">
            {userEntries.length} entries • Last updated: {
              stats.lastUpdate ? format(new Date(stats.lastUpdate), 'MMM dd, yyyy HH:mm') : 'Never'
            }
          </div>
        </div>

        {userEntries.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Vegetable</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Last Updated</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userEntries.map((entry) => {
                  const isStale = (new Date().getTime() - entry.updatedAt.getTime()) / (1000 * 60 * 60) > 48;
                  
                  return (
                    <tr key={entry.id}>
                      <td className="font-medium">{entry.vegetableName}</td>
                      <td className="font-semibold text-green-600">
                        ₱{entry.price.toFixed(2)}
                      </td>
                      <td className="text-gray-600">{entry.unit}</td>
                      <td className="text-gray-600">
                        {entry.availableQuantity || 'N/A'}
                      </td>
                      <td className="text-gray-600">
                        {format(entry.updatedAt, 'MMM dd, yyyy HH:mm')}
                      </td>
                      <td>
                        {isStale ? (
                          <span className="badge badge-warning">Stale</span>
                        ) : (
                          <span className="badge badge-success">Fresh</span>
                        )}
                      </td>
                      <td>
                        <button 
                          onClick={() => openModal('addEdit', entry)}
                          className="btn btn-outline btn-sm"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No price entries yet</h3>
            <p className="text-gray-600 mb-4">
              Start by adding your first vegetable price entry
            </p>
            <button onClick={handleAddNew} className="btn btn-primary">
              <Plus size={16} />
              Add Your First Entry
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {userEntries.length > 0 && (
        <div className="card mt-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="flex gap-4 flex-wrap">
            <button onClick={handleAddNew} className="btn btn-outline">
              <Plus size={16} />
              Add New Vegetable
            </button>
            <button onClick={handleBulkUpdate} className="btn btn-outline">
              <Edit3 size={16} />
              Bulk Update Prices
            </button>
            <button 
              onClick={() => window.open('/', '_blank')} 
              className="btn btn-outline"
            >
              <BarChart3 size={16} />
              View Public Price Board
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddEditModal />
      <BulkUpdateModal />
    </div>
  );
};

export default BuyerDashboard;
