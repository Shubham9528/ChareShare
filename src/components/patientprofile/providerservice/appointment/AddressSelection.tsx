import React from 'react';
import { MapPin } from 'lucide-react';
import { DetailedProvider } from '../../../types/provider';

export interface Address {
  id: string;
  city: string;
  country: string;
  street: string;
}

interface AddressSelectionProps {
  provider: DetailedProvider;
  selectedAddress: string;
  onAddressChange: (addressId: string) => void;
}

export const AddressSelection: React.FC<AddressSelectionProps> = ({
  provider,
  selectedAddress,
  onAddressChange
}) => {
  // Generate addresses based on provider data
  const addresses: Address[] = [
    {
      id: '1',
      city: provider.address.split(',')[1]?.trim() || 'Toronto Ontario',
      country: 'Canada',
      street: provider.address.split(',')[0]?.trim() || '2345 Westeimer Rd.'
    },
    {
      id: '2',
      city: 'Downtown Location',
      country: 'Canada',
      street: '1234 Main Street'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Address</h3>
      
      <div className="space-y-3">
        {addresses.map((address) => (
          <label
            key={address.id}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          >
            <input
              type="radio"
              name="address"
              value={address.id}
              checked={selectedAddress === address.id}
              onChange={(e) => onAddressChange(e.target.value)}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            
            <div className="flex items-start space-x-3 flex-1">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">
                  {address.city}, {address.country}
                </div>
                <div className="text-sm text-gray-600">
                  {address.street}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};