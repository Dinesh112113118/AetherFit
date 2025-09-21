import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Sun, 
  Wind,
  Droplets,
  Thermometer,
  Eye
} from 'lucide-react';

const WeatherWidget = () => {
  const weather = {
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 6,
    pressure: 30.12
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'partly cloudy':
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm text-white p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Current Weather</h3>
          <p className="text-blue-100 text-sm">San Francisco, CA</p>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-4xl font-bold">{weather.temperature}°F</div>
          <div className="text-blue-100">{weather.condition}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Droplets className="h-4 w-4 text-blue-200" />
          <span className="text-blue-100">Humidity</span>
          <span className="font-medium">{weather.humidity}%</span>
        </div>

        <div className="flex items-center space-x-2">
          <Wind className="h-4 w-4 text-blue-200" />
          <span className="text-blue-100">Wind</span>
          <span className="font-medium">{weather.windSpeed} mph</span>
        </div>

        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4 text-blue-200" />
          <span className="text-blue-100">Visibility</span>
          <span className="font-medium">{weather.visibility} mi</span>
        </div>

        <div className="flex items-center space-x-2">
          <Thermometer className="h-4 w-4 text-blue-200" />
          <span className="text-blue-100">UV Index</span>
          <span className="font-medium">{weather.uvIndex}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-blue-400">
        <div className="text-xs text-blue-100">
          Weather conditions can affect air quality and pollutant dispersion
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
