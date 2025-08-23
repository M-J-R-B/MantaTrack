import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, MapPin, Building, Eye, EyeOff, Save, AlertCircle } from 'lucide-react';

const BuyerProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    market: user?.market || '',
    location: user?.location || '',
    contactVisible: user?.contactVisible || false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      updateProfile(formData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('An error occurred while updating your profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6">
        <div className="card">
          <div className="text-center py-8">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">User information not available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="card mb-6">
        <div className="card-header">
          <h1 className="card-title">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle size={16} className="text-red-600" />
              <span className="text-red-600 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <span className="text-green-600 text-sm">{success}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Business Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="form-input pl-10"
                placeholder="Enter your business name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="form-input pl-10"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              This email is used for login and notifications
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="market" className="form-label">
              Market Name
            </label>
            <div className="relative">
              <Building size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="market"
                name="market"
                type="text"
                required
                className="form-input pl-10"
                placeholder="e.g., Central Market, Farmers Market"
                value={formData.market}
                onChange={handleChange}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              This will be displayed on the public price board
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="location"
                name="location"
                type="text"
                required
                className="form-input pl-10"
                placeholder="e.g., Downtown, Suburbs, City Center"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              This helps farmers find your market location
            </p>
          </div>

          <div className="form-group">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="contactVisible"
                checked={formData.contactVisible}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Make my contact information visible to farmers
              </span>
            </label>
            <p className="text-sm text-gray-500 mt-1">
              When enabled, farmers can see your email address on the price board
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              <Save size={16} />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Account Information */}
      <div className="card mt-6">
        <h3 className="font-semibold mb-4">Account Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Created:</span>
            <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Contact Visibility:</span>
            <span className="flex items-center gap-1">
              {formData.contactVisible ? (
                <>
                  <Eye size={14} className="text-green-600" />
                  <span className="text-green-600">Visible</span>
                </>
              ) : (
                <>
                  <EyeOff size={14} className="text-gray-600" />
                  <span className="text-gray-600">Hidden</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
