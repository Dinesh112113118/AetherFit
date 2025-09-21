import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  MapPin,
  Clock,
  Activity,
  Bell,
  Shield,
  Edit,
  Save,
  X
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const activities = [
    'Running', 'Cycling', 'Walking', 'Hiking', 'Swimming', 
    'Tennis', 'Basketball', 'Soccer', 'Yoga'
  ];

  const sensitivityLevels = [
    { id: 'low', label: 'Low', description: 'I rarely experience air quality effects' },
    { id: 'moderate', label: 'Moderate', description: 'I notice effects during poor air quality' },
    { id: 'high', label: 'High', description: 'I am sensitive to air quality changes' }
  ];

  const healthConditions = [
    'None', 'Asthma', 'Allergies', 'Heart Condition', 'Respiratory Issues', 'Other'
  ];

  const handleEditClick = () => {
    setFormData(user); // Sync form data with global state before editing
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(formData); // Update global state
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user); // Revert any changes
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value) => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    setFormData(prev => ({ ...prev, [field]: newValues }));
  };
  
  const handleNotificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Customize your AetherFit experience and health preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="h-5 w-5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="flex-1 p-3 bg-gray-50 rounded-lg text-gray-900">{user.location}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                {isEditing ? (
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Pacific Time (PT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Central Time (CT)</option>
                    <option>Eastern Time (ET)</option>
                  </select>
                ) : (
                  <p className="flex-1 p-3 bg-gray-50 rounded-lg text-gray-900">{user.timezone}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Activity Preferences</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Activities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {activities.map((activity) => (
                  <label
                    key={activity}
                    className={`flex items-center p-3 border rounded-lg transition-colors ${
                      formData.preferredActivities.includes(activity)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    } ${isEditing ? 'cursor-pointer hover:bg-gray-50' : 'pointer-events-none bg-gray-50'}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferredActivities.includes(activity)}
                      onChange={() => handleArrayChange('preferredActivities', activity)}
                      className="sr-only"
                      disabled={!isEditing}
                    />
                    <span className="text-sm font-medium text-gray-900">{activity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Air Quality Sensitivity
              </label>
              <div className="space-y-3">
                {sensitivityLevels.map((level) => (
                  <label
                    key={level.id}
                    className={`flex items-start p-4 border rounded-lg transition-colors ${
                      formData.sensitivityLevel === level.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    } ${isEditing ? 'cursor-pointer hover:bg-gray-50' : 'pointer-events-none bg-gray-50'}`}
                  >
                    <input
                      type="radio"
                      name="sensitivityLevel"
                      value={level.id}
                      checked={formData.sensitivityLevel === level.id}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                      disabled={!isEditing}
                    />
                    <div>
                      <span className="font-medium text-gray-900">{level.label}</span>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Health Information</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Health Conditions
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {healthConditions.map((condition) => (
                  <label
                    key={condition}
                    className={`flex items-center p-3 border rounded-lg transition-colors ${
                      formData.healthConditions.includes(condition)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                    } ${isEditing ? 'cursor-pointer hover:bg-gray-50' : 'pointer-events-none bg-gray-50'}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.healthConditions.includes(condition)}
                      onChange={() => handleArrayChange('healthConditions', condition)}
                      className="sr-only"
                      disabled={!isEditing}
                    />
                    <span className="text-sm font-medium text-gray-900">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fitness Goals
              </label>
              {isEditing ? (
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe your fitness goals and how air quality affects them..."
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.goals}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(formData.notifications).map(([type, enabled]) => (
              <div key={type} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {type} Notifications
                  </p>
                  <p className="text-sm text-gray-600">
                    Receive alerts via {type} when air quality affects your activities
                  </p>
                </div>
                <label className={`relative inline-flex items-center ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => handleNotificationChange(type)}
                    className="sr-only peer"
                    disabled={!isEditing}
                  />
                  <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEditing ? 'opacity-60' : ''}`}></div>
                </label>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
