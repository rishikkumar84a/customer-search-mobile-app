import { Platform } from 'react-native';

/**
 * API Configuration
 * 
 * Automatically determines the correct base URL based on the platform:
 * - iOS Simulator: localhost
 * - Android Emulator: 10.0.2.2 (special alias for host machine)
 * - Physical Device: Replace with your local IP address
 */

// Change this to your local IP address when testing on a physical device
const LOCAL_IP = '192.168.1.14'; // Replace with your actual IP

const getBaseURL = (): string => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Android emulator uses 10.0.2.2 to access host machine
      return 'http://10.0.2.2:3001';
    } else if (Platform.OS === 'ios') {
      // iOS simulator can use localhost
      return 'http://localhost:3001';
    } else {
      // For physical devices, use local IP
      return `http://${LOCAL_IP}:3001`;
    }
  }
  // Production URL would go here
  return 'https://api.care247.com';
};

export const API_BASE_URL = getBaseURL();
export const ENDPOINTS = {
  CUSTOMERS: '/customers',
};
