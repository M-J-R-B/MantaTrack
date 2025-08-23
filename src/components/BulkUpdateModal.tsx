import React, { useState, useMemo } from 'react';
import { X, Save, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

const BulkUpdateModal: React.FC = () => {
  const { user } = useAuth();
  const { 
    isModalOpen, 
    modalType, 
    closeModal, 
    bulkUpdatePrices,
    priceEntries 
  } = useApp();

  const [updates, setUpdates] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Get user's price entries
  const userEntries = useMemo(() => {
    return priceEntries.filter(entry => entry.buyerId === user?.id);
  }, [priceEntries, user?.id]);

  // Reset updates when modal opens
  React.useEffect(() => {
    if (isModalOpen && modalType === 'bulkUpdate') {
      const initialUpdates: Record<string, string> = {};
      userEntries.forEach(entry => {
        initialUpdates[entry.id] = entry.price.toString();
      });
      setUpdates(initialUpdates);
    }
  }, [isModalOpen, modalType, userEntries]);

  const handlePriceChange = (entryId: string, newPrice: string) => {
    setUpdates(prev => ({
      ...prev,
      [entryId]: newPrice,
    }));
  };

  const handleSaveAll = async () => {
    setIsLoading(true);
    
    try {
      const priceUpdates = Object.entries(updates)
        .filter(([entryId, newPrice]) => {
          const entry = userEntries.find(e => e.id === entryId);
          return entry && parseFloat(newPrice) !== entry.price;
        })
        .map(([entryId, newPrice]) => ({
          id: entryId,
          newPrice: parseFloat(newPrice),
        }));

      if (priceUpdates.length > 0) {
        bulkUpdatePrices(priceUpdates);
      }
      
      closeModal();
    } catch (error) {
      console.error('Error updating prices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getChangedCount = () => {
    return Object.entries(updates).filter(([entryId, newPrice]) => {
      const entry = userEntries.find(e => e.id === entryId);
      return entry && parseFloat(newPrice) !== entry.price;
    }).length;
  };

  if (!isModalOpen || modalType !== 'bulkUpdate') {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Bulk Update Prices</h2>
          <button onClick={closeModal} className="modal-close">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              Update prices for all your vegetable entries at once. 
              Only changed prices will be updated.
            </p>
          </div>

          {userEntries.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Vegetable</th>
                    <th>Current Price</th>
                    <th>New Price</th>
                    <th>Unit</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userEntries.map((entry) => {
                    const newPrice = updates[entry.id] || entry.price.toString();
                    const hasChanged = parseFloat(newPrice) !== entry.price;
                    
                    return (
                      <tr key={entry.id}>
                        <td className="font-medium">{entry.vegetableName}</td>
                        <td className="text-gray-600">₱{entry.price.toFixed(2)}</td>
                        <td>
                          <div className="relative">
                            <DollarSign size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className={`form-input pl-8 ${hasChanged ? 'border-green-500 bg-green-50' : ''}`}
                              value={newPrice}
                              onChange={(e) => handlePriceChange(entry.id, e.target.value)}
                              disabled={isLoading}
                            />
                          </div>
                        </td>
                        <td className="text-gray-600">{entry.unit}</td>
                        <td>
                          {hasChanged ? (
                            <span className="badge badge-success">Modified</span>
                          ) : (
                            <span className="text-gray-500 text-sm">No change</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No price entries found</h3>
              <p className="text-gray-600">
                You need to add some vegetable price entries first.
              </p>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {getChangedCount()} of {userEntries.length} entries will be updated
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={isLoading}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isLoading || getChangedCount() === 0}
              className="btn btn-primary"
            >
              <Save size={16} />
              {isLoading ? 'Updating...' : `Save ${getChangedCount()} Changes`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpdateModal;
