import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { CustomerListItem } from '../components/customer/CustomerListItem';
import { Customer } from '../types/customer';
import { searchCustomers } from '../services/api/customerService';
import { RootStackParamList } from '../navigation/types';

type ResultsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Results'
>;

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface ResultsScreenProps {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

/**
 * Results Screen
 * 
 * Displays search results in a list.
 * Features:
 * - Pull to refresh
 * - Loading states
 * - Empty state
 * - Error handling
 */
export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  navigation,
  route,
}) => {
  const { customers: initialCustomers, searchCriteria } = route.params;
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      const results = await searchCustomers(searchCriteria);
      setCustomers(results);
    } catch (error: any) {
      setError(error.message || 'Failed to refresh results');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCustomerPress = (customer: Customer) => {
    navigation.navigate('CustomerDetail', { customer });
  };

  const handleBackToSearch = () => {
    navigation.goBack();
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Customers Found</Text>
      <Text style={styles.emptyText}>
        No customers match your search criteria.
      </Text>
      <Text style={styles.emptyText}>Try different search terms.</Text>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToSearch}
      >
        <Text style={styles.backButtonText}>Back to Search</Text>
      </TouchableOpacity>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Error</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={handleRefresh}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToSearch} style={styles.backIcon}>
          <Text style={styles.backIconText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Search Results</Text>
          <Text style={styles.subtitle}>
            {customers.length} customer{customers.length !== 1 ? 's' : ''} found
          </Text>
        </View>
      </View>

      {error ? (
        renderError()
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CustomerListItem customer={item} onPress={handleCustomerPress} />
          )}
          contentContainerStyle={
            customers.length === 0
              ? styles.emptyListContainer
              : styles.listContainer
          }
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#3498db']}
            />
          }
        />
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
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 12,
    padding: 4,
  },
  backIconText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 2,
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  backButton: {
    marginTop: 24,
    backgroundColor: '#3498db',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#e74c3c',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
