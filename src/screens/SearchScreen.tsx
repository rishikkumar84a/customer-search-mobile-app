import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DynamicForm } from '../components/form/DynamicForm';
import { searchConfig } from '../config/appConfig';
import { searchCustomers } from '../services/api/customerService';
import { RootStackParamList } from '../navigation/types';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

/**
 * Search Screen
 * 
 * Displays a dynamic search form based on searchConfig.
 * When the user submits, it calls the API and navigates to Results screen.
 */
export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (values: Record<string, string>) => {
    if (Object.keys(values).length === 0) {
      Alert.alert('No Search Criteria', 'Please enter at least one search criterion.');
      return;
    }

    setIsLoading(true);

    try {
      const results = await searchCustomers(values);
      
      navigation.navigate('Results', {
        customers: results,
        searchCriteria: values,
      });
    } catch (error: any) {
      Alert.alert(
        'Search Failed',
        error.message || 'Unable to search customers. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    // Form values are cleared by DynamicForm
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer Search</Text>
        <Text style={styles.subtitle}>Care247</Text>
      </View>

      <DynamicForm
        config={searchConfig}
        onSubmit={handleSearch}
        onClear={handleClear}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
