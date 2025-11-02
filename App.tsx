import React from 'react';
import { StatusBar } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';

/**
 * App Component
 * 
 * Main entry point for the Care247 Customer Search Application.
 * 
 * Architecture:
 * - Configuration-driven UI (all forms and displays driven by config)
 * - Three main screens: Search, Results, CustomerDetail
 * - API integration with JSON Server
 * - Type-safe with TypeScript
 * 
 * Author: Rishik Kumar Chaurasiya
 * Email: rishikkumarchaurasiya@gmail.com
 */
const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />
      <RootNavigator />
    </>
  );
};

export default App;
