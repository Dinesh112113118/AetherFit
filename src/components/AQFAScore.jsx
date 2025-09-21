import React from 'react';
import { motion } from 'framer-motion';
import { Wind, TrendingUp, TrendingDown } from 'lucide-react';

const AQFAScore = ({ score, activity, trend = 'up' }) => {
  const getScoreGradientColors = (score) => {
    if (score >= 8) return ['#4ade80', '#16a34a']; // green-400 to green-600
    if (score >= 6) return ['#facc15', '#ca8a04']; // yellow-400 to yellow-600
    if (score >= 4) return ['#fb923c', '#ea580c']; // orange-400 to orange-600
    return ['#f87171', '#dc2626']; // red-400 to red-600
  };

  const getScoreText = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Moderate';
    return 'Poor';
  };

  const getTextColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const percentage = (score / 10) * 100;
  const gradientColors = getScoreGradientColors(score);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wind className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AQFA Score</h3>
        </div>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
          <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? 'Improving' : 'Declining'}
          </span>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className={`text-4xl font-bold ${getTextColor(score)}`}>
          {score.toFixed(1)}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {getScoreText(score)} for {activity}
        </div>
      </div>

      {/* Progress Ring */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - percentage / 100) }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradientColors[0]} />
              <stop offset="100%" stopColor={gradientColors[1]} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getTextColor(score)}`}>
              {score.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">/ 10</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Updated 5 minutes ago
      </div>
    </div>
  );
};

export default AQFAScore;
