import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wind, 
  MapPin, 
  Activity, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import AQFAScore from '../components/AQFAScore';
import PollutantBreakdown from '../components/PollutantBreakdown';
import ActivityRecommendations from '../components/ActivityRecommendations';
import WeatherWidget from '../components/WeatherWidget';
import { generateMockAirQualityData } from '../utils/mockData';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useUser();
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCurrentData(generateMockAirQualityData());
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading air quality data...</p>
        </div>
      </div>
    );
  }

  const getAQFAColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Good morning, {user.name.split(' ')[0]}! 👋
            </h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{user.location}</span>
              <Clock className="h-4 w-4 ml-4 mr-1" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AQFA Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-xl shadow-sm border-l-4 ${
              currentData.aqfaScore >= 8 ? 'border-green-500 bg-green-50' :
              currentData.aqfaScore >= 6 ? 'border-yellow-500 bg-yellow-50' :
              currentData.aqfaScore >= 4 ? 'border-orange-500 bg-orange-50' :
              'border-red-500 bg-red-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Current AQFA Score
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Air Quality for Activity - Running
                </p>
              </div>
              <div className={`text-4xl font-bold ${getAQFAColor(currentData.aqfaScore)}`}>
                {currentData.aqfaScore.toFixed(1)}
                <span className="text-lg text-gray-500">/10</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                currentData.aqfaScore >= 8 ? 'bg-green-100 text-green-800' :
                currentData.aqfaScore >= 6 ? 'bg-yellow-100 text-yellow-800' :
                currentData.aqfaScore >= 4 ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentData.aqfaScore >= 8 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Excellent for outdoor activities
                  </>
                ) : currentData.aqfaScore >= 6 ? (
                  <>
                    <Info className="h-4 w-4 mr-1" />
                    Good with minor precautions
                  </>
                ) : currentData.aqfaScore >= 4 ? (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Moderate - Consider alternatives
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Poor - Avoid outdoor activities
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Activity Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ActivityRecommendations data={currentData} />
          </motion.div>

          {/* Pollutant Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PollutantBreakdown data={currentData} />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WeatherWidget />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Today's Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Best Time</span>
                </div>
                <span className="text-sm font-medium">6:00 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Worst Time</span>
                </div>
                <span className="text-sm font-medium">2:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-blue-600 mr-3" />
                  <span className="text-sm text-gray-600">Trend</span>
                </div>
                <span className="text-sm font-medium text-blue-600">Improving</span>
              </div>
            </div>
          </motion.div>

          {/* AetherFit Score Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AQFAScore score={currentData.aqfaScore} activity="Running" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
