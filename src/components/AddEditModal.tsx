import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { PriceEntry } from '../types';

const AddEditModal: React.FC = () => {
  const { user } = useAuth();
  const { 
    isModalOpen, 
    modalType, 
    selectedPriceEntry, 
    closeModal, 
    addPriceEntry, 
    updatePriceEntry, 
    deletePriceEntry,
    vegetables 
  } = useApp();

  const [formData, setFormData] = useState({
    vegetableId: '',
    vegetableName: '',
    price: '',
    unit: 'kg' as 'kg' | 'pc' | 'bundle',
    availableQuantity: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = selectedPriceEntry && modalType === 'addEdit';

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isModalOpen && modalType === 'addEdit') {
      if (isEditMode && selectedPriceEntry) {
        setFormData({
          vegetableId: selectedPriceEntry.vegetableId,
          vegetableName: selectedPriceEntry.vegetableName,
          price: selectedPriceEntry.price.toString(),
          unit: selectedPriceEntry.unit,
          availableQuantity: selectedPriceEntry.availableQuantity?.toString() || '',
          notes: selectedPriceEntry.notes || '',
        });
      } else {
        setFormData({
          vegetableId: '',
          vegetableName: '',
          price: '',
          unit: 'kg',
          availableQuantity: '',
          notes: '',
        });
      }
      setErrors({});
    }
  }, [isModalOpen, modalType, selectedPriceEntry, isEditMode]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.vegetableId) {
      newErrors.vegetableId = 'Please select a vegetable';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.unit) {
      newErrors.unit = 'Please select a unit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) return;

    setIsLoading(true);

    try {
      const entryData = {
        vegetableId: formData.vegetableId,
        vegetableName: formData.vegetableName,
        price: parseFloat(formData.price),
        unit: formData.unit,
        buyerId: user.id,
        buyerName: user.name,
        market: user.market,
        location: user.location,
        availableQuantity: formData.availableQuantity ? parseFloat(formData.availableQuantity) : undefined,
        notes: formData.notes || undefined,
      };

      if (isEditMode && selectedPriceEntry) {
        updatePriceEntry(selectedPriceEntry.id, entryData);
      } else {
        addPriceEntry(entryData);
      }

      closeModal();
    } catch (error) {
      console.error('Error saving price entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditMode || !selectedPriceEntry) return;

    if (window.confirm('Are you sure you want to delete this price entry?')) {
      setIsLoading(true);
      try {
        deletePriceEntry(selectedPriceEntry.id);
        closeModal();
      } catch (error) {
        console.error('Error deleting price entry:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVegetableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vegetableId = e.target.value;
    const vegetable = vegetables.find(v => v.id === vegetableId);
    
    setFormData({
      ...formData,
      vegetableId,
      vegetableName: vegetable?.name || '',
    });
  };

  if (!isModalOpen || modalType !== 'addEdit') {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditMode ? 'Edit Price Entry' : 'Add New Price Entry'}
          </h2>
          <button onClick={closeModal} className="modal-close">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="vegetable" className="form-label">
              Vegetable *
            </label>
            <select
              id="vegetable"
              className={`form-select ${errors.vegetableId ? 'border-red-500' : ''}`}
              value={formData.vegetableId}
              onChange={handleVegetableChange}
              disabled={isLoading}
            >
              <option value="">Select a vegetable</option>
              {vegetables.map(vegetable => (
                <option key={vegetable.id} value={vegetable.id}>
                  {vegetable.name}
                </option>
              ))}
            </select>
            {errors.vegetableId && (
              <p className="text-red-500 text-sm mt-1">{errors.vegetableId}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Price (₱) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                className={`form-input ${errors.price ? 'border-red-500' : ''}`}
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                disabled={isLoading}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="unit" className="form-label">
                Unit *
              </label>
              <select
                id="unit"
                className={`form-select ${errors.unit ? 'border-red-500' : ''}`}
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value as 'kg' | 'pc' | 'bundle' })}
                disabled={isLoading}
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="pc">Piece (pc)</option>
                <option value="bundle">Bundle</option>
              </select>
              {errors.unit && (
                <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="availableQuantity" className="form-label">
              Available Quantity (Optional)
            </label>
            <input
              id="availableQuantity"
              type="number"
              min="0"
              className="form-input"
              placeholder="Enter available quantity"
              value={formData.availableQuantity}
              onChange={(e) => setFormData({ ...formData, availableQuantity: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              className="form-input"
              rows={3}
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </form>
        
        <div className="modal-footer">
          {isEditMode && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="btn btn-danger"
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              onClick={closeModal}
              disabled={isLoading}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary"
            >
              <Save size={16} />
              {isLoading ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
