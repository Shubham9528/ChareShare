import React from 'react';

// Health and medical themed photos
const photoData = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Stethoscope on medical chart'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Healthy salad bowl'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Woman doing yoga pose'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Fresh fruits and vegetables'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Person running outdoors'
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
  },
  {
    id: '13',
    url: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Patient consultation'
  },
  {
    id: '14',
    url: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Healthcare professional'
  },
  {
    id: '15',
    url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Medical professional'
  }
];

export const PhotoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-1 p-1">
      {photoData.map((photo) => (
        <div
          key={photo.id}
          className="aspect-square bg-gray-200 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200 rounded-md"
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
    </div>
  );
};