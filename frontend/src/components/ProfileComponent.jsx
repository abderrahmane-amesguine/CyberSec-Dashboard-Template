import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Edit, Camera } from 'lucide-react';

const ProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    position: 'Full Stack Developer',
    bio: 'Experienced developer with a passion for creating intuitive and efficient applications.',
    avatar: '/api/placeholder/150/150'
  });

  const handleSave = () => {
    // In a real app, you would send this data to your backend
    setIsEditing(false);
    // Show success message
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-md flex items-center ${
            isEditing ? 'bg-gray-500 text-white' : 'bg-blue-600 text-white'
          }`}
        >
          {isEditing ? 'Cancel' : <><Edit className="mr-2" size={18} /> Edit Profile</>}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-600 h-32 relative">
          {/* Avatar */}
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <img 
                src={userData.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full">
                  <Camera size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="pt-16 px-6 pb-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">
                {isEditing ? (
                  <input 
                    type="text" 
                    value={userData.name} 
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                  />
                ) : userData.name}
              </h3>
              <p className="text-gray-600">
                {isEditing ? (
                  <input 
                    type="text" 
                    value={userData.position} 
                    className="border border-gray-300 rounded-md px-3 py-2 w-full mt-2"
                    onChange={(e) => setUserData({...userData, position: e.target.value})}
                  />
                ) : userData.position}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Bio</h4>
              {isEditing ? (
                <textarea 
                  value={userData.bio} 
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  rows="3"
                  onChange={(e) => setUserData({...userData, bio: e.target.value})}
                />
              ) : (
                <p>{userData.bio}</p>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-4">Contact Information</h4>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="text-gray-500 mr-3" size={18} />
                {isEditing ? (
                  <input 
                    type="email" 
                    value={userData.email} 
                    className="border border-gray-300 rounded-md px-3 py-1 flex-grow"
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                ) : (
                  <span>{userData.email}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <Phone className="text-gray-500 mr-3" size={18} />
                {isEditing ? (
                  <input 
                    type="tel" 
                    value={userData.phone} 
                    className="border border-gray-300 rounded-md px-3 py-1 flex-grow"
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  />
                ) : (
                  <span>{userData.phone}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <MapPin className="text-gray-500 mr-3" size={18} />
                {isEditing ? (
                  <input 
                    type="text" 
                    value={userData.location} 
                    className="border border-gray-300 rounded-md px-3 py-1 flex-grow"
                    onChange={(e) => setUserData({...userData, location: e.target.value})}
                  />
                ) : (
                  <span>{userData.location}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;