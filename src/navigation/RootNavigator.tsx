import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchScreen } from '../screens/SearchScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { CustomerDetailScreen } from '../screens/CustomerDetailScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root Navigator
 * 
 * Sets up the navigation stack for the application.
 * Screens:
 * 1. Search - Initial screen with search form
 * 2. Results - List of search results
 * 3. CustomerDetail - Detailed view of a single customer
 */
export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Search"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Customer Search' }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: 'Search Results' }}
        />
        <Stack.Screen
          name="CustomerDetail"
          component={CustomerDetailScreen}
          options={{ title: 'Customer Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
