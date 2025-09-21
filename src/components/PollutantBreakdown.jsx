import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PollutantBreakdown = ({ data }) => {
  const pollutants = [
    { name: 'O₃', value: data.pollutants.ozone, color: '#3B82F6', label: 'Ozone' },
    { name: 'NO₂', value: data.pollutants.no2, color: '#EF4444', label: 'Nitrogen Dioxide' },
    { name: 'PM2.5', value: data.pollutants.pm25, color: '#F59E0B', label: 'Fine Particles' },
    { name: 'PM10', value: data.pollutants.pm10, color: '#10B981', label: 'Coarse Particles' },
  ];

  const getStatusColor = (value) => {
    if (value <= 50) return 'text-green-600';
    if (value <= 100) return 'text-yellow-600';
    if (value <= 150) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusText = (value) => {
    if (value <= 50) return 'Good';
    if (value <= 100) return 'Moderate';
    if (value <= 150) return 'Unhealthy for Sensitive';
    return 'Unhealthy';
  };

  const getBarColor = (value) => {
    if (value <= 50) return '#10B981';
    if (value <= 100) return '#F59E0B';
    if (value <= 150) return '#F97316';
    return '#EF4444';
  };

  const chartData = pollutants.map(pollutant => ({
    ...pollutant,
    fill: getBarColor(pollutant.value)
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Pollutant Breakdown
      </h3>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value, name, props) => [
                `${value} AQI`,
                props.payload.label
              ]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pollutants.map((pollutant, index) => (
          <motion.div
            key={pollutant.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pollutant.color }}
                ></div>
                <span className="font-medium text-gray-900">{pollutant.label}</span>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(pollutant.value)}`}>
                {getStatusText(pollutant.value)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {pollutant.value.toFixed(0)}
              </span>
              <span className="text-sm text-gray-500">AQI</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: getBarColor(pollutant.value) }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((pollutant.value / 200) * 100, 100)}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Impact on Activities */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Impact on Activities</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• <strong>Ozone</strong>: Can cause respiratory irritation during intense exercise</p>
          <p>• <strong>NO₂</strong>: May increase airway inflammation for sensitive individuals</p>
          <p>• <strong>PM2.5/PM10</strong>: Fine particles can penetrate deep into lungs</p>
        </div>
      </div>
    </div>
  );
};

export default PollutantBreakdown;
