import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Layers, 
  Route, 
  Filter,
  Search,
  Navigation,
  MapPin
} from 'lucide-react';

const MapView = () => {
  const [selectedActivity, setSelectedActivity] = useState('running');
  const [selectedPollutant, setSelectedPollutant] = useState('overall');

  const activities = [
    { id: 'running', label: 'Running', icon: '🏃' },
    { id: 'cycling', label: 'Cycling', icon: '🚴' },
    { id: 'walking', label: 'Walking', icon: '🚶' },
    { id: 'outdoor-sports', label: 'Outdoor Sports', icon: '⚽' }
  ];

  const pollutants = [
    { id: 'overall', label: 'Overall AQFA' },
    { id: 'ozone', label: 'Ozone (O₃)' },
    { id: 'no2', label: 'Nitrogen Dioxide (NO₂)' },
    { id: 'pm25', label: 'PM2.5' },
    { id: 'pm10', label: 'PM10' }
  ];

  const routes = [
    { id: 1, name: 'Golden Gate Park Loop', distance: '3.2 mi', score: 8.5, color: 'green' },
    { id: 2, name: 'Embarcadero Trail', distance: '5.1 mi', score: 7.2, color: 'yellow' },
    { id: 3, name: 'Mission Bay Circuit', distance: '2.8 mi', score: 6.8, color: 'yellow' },
    { id: 4, name: 'Downtown Core', distance: '4.0 mi', score: 4.2, color: 'red' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Route Optimization Map
        </h1>
        <p className="text-gray-600">
          Find the best routes for your activities based on real-time air quality data
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Activity Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => setSelectedActivity(activity.id)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    selectedActivity === activity.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">{activity.icon}</span>
                    <span>{activity.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pollutant Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Focus Pollutant
            </label>
            <select
              value={selectedPollutant}
              onChange={(e) => setSelectedPollutant(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {pollutants.map((pollutant) => (
                <option key={pollutant.id} value={pollutant.id}>
                  {pollutant.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Search Location
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter address or landmark..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Map Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
              <div className="text-center">
                <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Interactive Map View</p>
                <p className="text-sm text-gray-500 mt-2">
                  Real map integration with NASA TEMPO data would be displayed here
                </p>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
                  <Layers className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
                  <Navigation className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Sample Route Markers */}
              <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
            </div>

            {/* Map Legend */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Excellent (8-10)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Good (6-8)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Moderate (4-6)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Poor (0-4)</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Data from NASA TEMPO • Updated hourly
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Route Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Route className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Recommended Routes
              </h3>
            </div>
            
            <div className="space-y-3">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{route.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{route.distance}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        route.color === 'green' ? 'bg-green-500' :
                        route.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900">
                        {route.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Current Location
              </h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium text-gray-900">
                  123 Market St, San Francisco, CA
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current AQFA Score</p>
                <p className="font-medium text-green-600">8.2 - Excellent</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapView;
