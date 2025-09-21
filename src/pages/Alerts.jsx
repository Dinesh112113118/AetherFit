import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell,
  Plus,
  Clock,
  MapPin,
  Activity,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Morning Run Alert',
      activity: 'Running',
      location: 'Golden Gate Park',
      time: '06:00 AM',
      threshold: 6,
      enabled: true,
      lastTriggered: '2 days ago'
    },
    {
      id: 2,
      title: 'Cycling Commute',
      activity: 'Cycling',
      location: 'Embarcadero Route',
      time: '08:00 AM',
      threshold: 7,
      enabled: true,
      lastTriggered: 'Never'
    },
    {
      id: 3,
      title: 'Weekend Hike',
      activity: 'Hiking',
      location: 'Twin Peaks',
      time: '09:00 AM',
      threshold: 8,
      enabled: false,
      lastTriggered: '1 week ago'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    activity: 'running',
    location: '',
    time: '08:00',
    threshold: 6,
    enabled: true
  });

  const activities = [
    { id: 'running', label: 'Running', icon: '🏃' },
    { id: 'cycling', label: 'Cycling', icon: '🚴' },
    { id: 'walking', label: 'Walking', icon: '🚶' },
    { id: 'hiking', label: 'Hiking', icon: '🥾' },
    { id: 'outdoor-sports', label: 'Outdoor Sports', icon: '⚽' }
  ];

  const toggleAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const createAlert = () => {
    const alert = {
      ...newAlert,
      id: Date.now(),
      lastTriggered: 'Never'
    };
    setAlerts([...alerts, alert]);
    setNewAlert({
      title: '',
      activity: 'running',
      location: '',
      time: '08:00',
      threshold: 6,
      enabled: true
    });
    setShowCreateModal(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Activity Alerts</h1>
          <p className="text-gray-600 mt-2">
            Get notified when air quality conditions are perfect for your activities
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Alert</span>
        </button>
      </motion.div>

      {/* Alert Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(alert => alert.enabled).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Triggered Today</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Next Alert</p>
              <p className="text-2xl font-bold text-gray-900">6:00 AM</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alerts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  alert.enabled ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Bell className={`h-6 w-6 ${
                    alert.enabled ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {alert.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Activity className="h-4 w-4" />
                      <span>{alert.activity}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      Trigger when AQFA score ≥ {alert.threshold} • Last triggered: {alert.lastTriggered}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className="p-2 rounded-lg transition-colors"
                >
                  {alert.enabled ? (
                    <ToggleRight className="h-5 w-5 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Create New Alert
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Title
                  </label>
                  <input
                    type="text"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Morning Run Alert"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity
                  </label>
                  <select
                    value={newAlert.activity}
                    onChange={(e) => setNewAlert({ ...newAlert, activity: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {activities.map((activity) => (
                      <option key={activity.id} value={activity.id}>
                        {activity.icon} {activity.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Golden Gate Park"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newAlert.time}
                      onChange={(e) => setNewAlert({ ...newAlert, time: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min AQFA Score
                    </label>
                    <select
                      value={newAlert.threshold}
                      onChange={(e) => setNewAlert({ ...newAlert, threshold: parseInt(e.target.value) })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[4, 5, 6, 7, 8, 9].map((score) => (
                        <option key={score} value={score}>{score}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createAlert}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Alert
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
