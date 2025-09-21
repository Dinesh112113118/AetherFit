import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    location: 'San Francisco, CA',
    timezone: 'Pacific Time (PT)',
    preferredActivities: ['Running', 'Cycling', 'Hiking'],
    sensitivityLevel: 'moderate',
    notifications: {
      push: true,
      email: false,
      sms: false
    },
    healthConditions: ['None'],
    goals: 'Maintain optimal performance while staying healthy'
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
