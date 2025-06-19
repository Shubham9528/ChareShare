import React from 'react';

interface PhotoGridProps {
  searchQuery: string;
}

// Mock photo data with health and lifestyle themes
const photoData = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Stethoscope on medical chart'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Woman doing yoga pose'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Person running outdoors'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Fresh fruits and vegetables'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Healthy salad bowl'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Friends exercising together'
  },
  {
    id: '7',
    url: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Medical equipment'
  },
  {
    id: '8',
    url: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Healthy smoothie ingredients'
  },
  {
    id: '9',
    url: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Doctor consultation'
  },
  {
    id: '10',
    url: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Fresh vegetables'
  },
  {
    id: '11',
    url: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Medical team'
  },
  {
    id: '12',
    url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Healthy lifestyle'
  }
];

export const PhotoGrid: React.FC<PhotoGridProps> = ({ searchQuery }) => {
  // Filter photos based on search query (simple implementation)
  const filteredPhotos = searchQuery 
    ? photoData.filter(photo => 
        photo.alt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : photoData;

  return (
    <div className="grid grid-cols-4 gap-0.5">
      {filteredPhotos.map((photo) => (
        <div
          key={photo.id}
          className="aspect-square bg-gray-200 rounded-sm overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
        >
          <img
            src={photo.url}
            alt={photo.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center">
                    <div class="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
      ))}
      
      {filteredPhotos.length === 0 && searchQuery && (
        <div className="col-span-4 text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-600">
            Try searching for something else
          </p>
        </div>
      )}
    </div>
  );
};