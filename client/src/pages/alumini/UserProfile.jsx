import React, { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/outline'; // Import User icon

const Profile = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch profile data from reqres API and set the form data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://reqres.in/api/users/1"); // Use user ID 2 for demonstration
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        
        // Set form data based on fetched data
        setFormData({ name: `${data.data.first_name} ${data.data.last_name}`, email: data.data.email, password: '' });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit updated profile data
  const handleUpdate = (e) => {
    e.preventDefault();
    // Since we have a read-only API, we'll just log data without actually updating it
    console.log('Updated Data:', formData);
    setMessage('Profile updated successfully!'); // Show success message
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 px-10 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <UserIcon className="h-10 w-10 text-blue-500 mr-3" aria-hidden="true" /> {/* User Icon */}
        <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
      </div>

      {message && <div className="mb-4 text-green-500 text-center">{message}</div>}

      <form onSubmit={handleUpdate}>
        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          {!isEditing ? (
            <p className="mt-1 text-gray-600">{formData.name}</p>
          ) : (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          {!isEditing ? (
            <p className="mt-1 text-gray-600">{formData.email}</p>
          ) : (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Password Field (only shown in edit mode) */}
        {isEditing && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Toggle between Edit and Save modes */}
        <div>
          {isEditing ? (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-500 text-white font-bold py-2 px-5 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
