import { Customer, SearchCriteria } from '../types/customer';

/**
 * Navigation Type Definitions
 * 
 * Defines the structure of the navigation stack and the parameters
 * each screen expects.
 */
export type RootStackParamList = {
  Search: undefined;
  Results: {
    customers: Customer[];
    searchCriteria: SearchCriteria;
  };
  CustomerDetail: {
    customer: Customer;
  };
};
