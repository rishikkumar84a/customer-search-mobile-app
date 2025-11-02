// Customer data types
export interface Address {
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Phone {
  type: string;
  number: string;
  isPrimary: boolean;
}

export interface Email {
  type: string;
  address: string;
  isPrimary: boolean;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: string;
  addresses: Address[];
  phones: Phone[];
  emails: Email[];
}

// Search criteria type
export interface SearchCriteria {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}
