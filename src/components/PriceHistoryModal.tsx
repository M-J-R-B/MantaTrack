import React, { useMemo } from 'react';
import { X, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { format } from 'date-fns';
import { getPriceHistoryForEntry } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceHistoryModal: React.FC = () => {
  const { isModalOpen, modalType, selectedPriceEntry, closeModal } = useApp();

  const priceHistory = useMemo(() => {
    if (!selectedPriceEntry || modalType !== 'priceHistory') return [];
    return getPriceHistoryForEntry(selectedPriceEntry.id);
  }, [selectedPriceEntry, modalType]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!selectedPriceEntry) return [];
    
    const history = [...priceHistory].reverse(); // Show oldest to newest
    const data = [];
    
    // Add initial price point
    if (history.length > 0) {
      data.push({
        date: format(selectedPriceEntry.createdAt, 'MMM dd'),
        price: history[history.length - 1].oldPrice,
        timestamp: selectedPriceEntry.createdAt.getTime(),
      });
    }
    
    // Add history points
    history.forEach((entry, index) => {
      data.push({
        date: format(entry.updatedAt, 'MMM dd'),
        price: entry.newPrice,
        timestamp: entry.updatedAt.getTime(),
      });
    });
    
    return data;
  }, [selectedPriceEntry, priceHistory]);

  if (!isModalOpen || modalType !== 'priceHistory' || !selectedPriceEntry) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            Price History - {selectedPriceEntry.vegetableName}
          </h2>
          <button onClick={closeModal} className="modal-close">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          {/* Current Price Info */}
          <div className="card mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{selectedPriceEntry.vegetableName}</h3>
                <p className="text-gray-600">{selectedPriceEntry.buyerName} • {selectedPriceEntry.market}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ₱{selectedPriceEntry.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">per {selectedPriceEntry.unit}</div>
              </div>
            </div>
          </div>

          {/* Price Chart */}
          {chartData.length > 1 && (
            <div className="card mb-6">
              <h3 className="font-semibold mb-4">Price Trend</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `₱${value}`}
                    />
                    <Tooltip 
                      formatter={(value: any) => [`₱${value}`, 'Price']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Price History Table */}
          <div className="card">
            <h3 className="font-semibold mb-4">Price Updates</h3>
            {priceHistory.length > 0 ? (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Old Price</th>
                      <th>New Price</th>
                      <th>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceHistory.map((entry) => {
                      const change = entry.newPrice - entry.oldPrice;
                      const changePercent = (change / entry.oldPrice) * 100;
                      
                      return (
                        <tr key={entry.id}>
                          <td className="text-gray-600">
                            {format(entry.updatedAt, 'MMM dd, yyyy HH:mm')}
                          </td>
                          <td>₱{entry.oldPrice.toFixed(2)}</td>
                          <td className="font-semibold">₱{entry.newPrice.toFixed(2)}</td>
                          <td>
                            <span className={`font-semibold ${
                              change > 0 ? 'text-red-600' : change < 0 ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              {change > 0 ? '+' : ''}₱{change.toFixed(2)} ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%)
                            </span>
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
                <p className="text-gray-600">No price history available</p>
                <p className="text-sm text-gray-500">This is the initial price entry</p>
              </div>
            )}
          </div>

          {/* Additional Info */}
          {selectedPriceEntry.notes && (
            <div className="card mt-4">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-gray-600">{selectedPriceEntry.notes}</p>
            </div>
          )}

          {selectedPriceEntry.availableQuantity && (
            <div className="card mt-4">
              <h3 className="font-semibold mb-2">Available Quantity</h3>
              <p className="text-gray-600">
                {selectedPriceEntry.availableQuantity} {selectedPriceEntry.unit}
              </p>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button onClick={closeModal} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryModal;
