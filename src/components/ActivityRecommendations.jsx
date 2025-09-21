import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  MapPin,
  Activity
} from 'lucide-react';

const ActivityRecommendations = ({ data }) => {
  const recommendations = [
    {
      activity: 'Running',
      score: data.aqfaScore,
      status: data.aqfaScore >= 7 ? 'recommended' : data.aqfaScore >= 5 ? 'caution' : 'avoid',
      time: '6:00 AM - 8:00 AM',
      location: 'Golden Gate Park',
      reason: data.aqfaScore >= 7 ? 'Excellent air quality' : data.aqfaScore >= 5 ? 'Moderate pollutant levels' : 'High pollution levels',
      icon: '🏃'
    },
    {
      activity: 'Cycling',
      score: data.aqfaScore + 0.5,
      status: data.aqfaScore >= 6.5 ? 'recommended' : data.aqfaScore >= 4.5 ? 'caution' : 'avoid',
      time: '7:00 AM - 9:00 AM',
      location: 'Embarcadero Trail',
      reason: data.aqfaScore >= 6.5 ? 'Good conditions for cycling' : data.aqfaScore >= 4.5 ? 'Consider shorter routes' : 'Poor air quality',
      icon: '🚴'
    },
    {
      activity: 'Walking',
      score: data.aqfaScore + 1,
      status: data.aqfaScore >= 5 ? 'recommended' : data.aqfaScore >= 3 ? 'caution' : 'avoid',
      time: 'Anytime',
      location: 'Mission Bay',
      reason: data.aqfaScore >= 5 ? 'Light activity suitable' : data.aqfaScore >= 3 ? 'Limit outdoor time' : 'Stay indoors',
      icon: '🚶'
    },
    {
      activity: 'Outdoor Sports',
      score: data.aqfaScore - 1,
      status: data.aqfaScore >= 8 ? 'recommended' : data.aqfaScore >= 6 ? 'caution' : 'avoid',
      time: '5:00 PM - 7:00 PM',
      location: 'Crissy Field',
      reason: data.aqfaScore >= 8 ? 'Perfect for intense activities' : data.aqfaScore >= 6 ? 'Monitor air quality' : 'High intensity not recommended',
      icon: '⚽'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'recommended':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'caution':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'avoid':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'recommended':
        return 'border-green-200 bg-green-50';
      case 'caution':
        return 'border-yellow-200 bg-yellow-50';
      case 'avoid':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'recommended':
        return 'Recommended';
      case 'caution':
        return 'Use Caution';
      case 'avoid':
        return 'Not Recommended';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Activity Recommendations
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.activity}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${getStatusColor(rec.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{rec.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{rec.activity}</h4>
                  <div className="flex items-center space-x-1 mt-1">
                    {getStatusIcon(rec.status)}
                    <span className={`text-sm font-medium ${
                      rec.status === 'recommended' ? 'text-green-700' :
                      rec.status === 'caution' ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {getStatusText(rec.status)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  rec.score >= 7 ? 'text-green-600' :
                  rec.score >= 5 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {rec.score.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">AQFA</div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{rec.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{rec.location}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Activity className="h-4 w-4 mt-0.5" />
                <span>{rec.reason}</span>
              </div>
            </div>

            {rec.status === 'recommended' && (
              <button className="w-full mt-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                Plan Activity
              </button>
            )}
            {rec.status === 'caution' && (
              <button className="w-full mt-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors">
                View Alternatives
              </button>
            )}
            {rec.status === 'avoid' && (
              <button className="w-full mt-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                Indoor Options
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* General Advice */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Today's Air Quality Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Early morning hours typically have the best air quality</li>
          <li>• Avoid activities near busy roads and industrial areas</li>
          <li>• Consider indoor alternatives if you have respiratory conditions</li>
          <li>• Stay hydrated and take breaks if you notice any discomfort</li>
        </ul>
      </div>
    </div>
  );
};

export default ActivityRecommendations;
