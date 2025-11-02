# Customer Search Mobile Application

A configuration-driven customer search application for Care247, built with React Native and TypeScript.

**Author:** Rishik Kumar Chaurasiya  
**Email:** rishikkumarchaurasiya@gmail.com  
**LinkedIn:** [linkedin.com/in/rishikkumar84ya](https://www.linkedin.com/in/rishikkumar84ya/)  
**GitHub:** [github.com/rishikkumar84a](https://github.com/rishikkumar84a)

---

## 📱 Overview

This mobile application provides a powerful, configuration-driven customer search interface. All search forms and result displays are dynamically generated from configuration objects, making the app highly maintainable and extensible.

### Key Features

✅ **Configuration-Driven Architecture** - Add new fields without modifying component code  
✅ **Dynamic Search Form** - All form fields generated from config  
✅ **Smart Results Display** - Pull-to-refresh, loading states, empty states  
✅ **Detailed Customer View** - Organized sections with formatted data  
✅ **Type-Safe** - Full TypeScript implementation  
✅ **Clean Navigation** - Smooth screen transitions  
✅ **Error Handling** - Comprehensive error states and messages  

---

## 🛠 Tech Stack

### Core Technologies
- **React Native** `0.73.2` - Cross-platform mobile framework
- **TypeScript** `5.3.3` - Type safety and enhanced developer experience
- **React Navigation** `6.x` - Screen navigation
- **Axios** - HTTP client for API requests
- **JSON Server** - Mock REST API

### Why React Native?

I chose React Native for this project for several compelling reasons:

1. **Cross-Platform Efficiency** - Single codebase runs on both iOS and Android
2. **Strong TypeScript Support** - Excellent type definitions and IDE support
3. **Rich Ecosystem** - Mature libraries for navigation, UI components, and more
4. **Hot Reload** - Fast development iteration
5. **Performance** - Native performance with JavaScript flexibility
6. **Community** - Large community and extensive documentation

### Styling Approach
- **React Native StyleSheet** - Built-in styling solution
- Clean, consistent design with custom components
- No heavy UI library dependencies for better control and smaller bundle size

---

## 📁 Project Structure

```
Customer-Search-Mobile-Application/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── form/
│   │   │   ├── FormField.tsx       # Dynamic field renderer
│   │   │   └── DynamicForm.tsx     # Configuration-driven form
│   │   └── customer/
│   │       └── CustomerListItem.tsx # List item component
│   ├── config/              # Application configuration
│   │   └── appConfig.ts     # Search & display configuration
│   ├── navigation/          # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── screens/             # Screen components
│   │   ├── SearchScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── CustomerDetailScreen.tsx
│   ├── services/            # API and business logic
│   │   └── api/
│   │       ├── config.ts
│   │       └── customerService.ts
│   └── types/               # TypeScript type definitions
│       ├── config.ts
│       └── customer.ts
├── App.tsx                  # Root component
├── index.js                 # App entry point
├── db.json                  # Mock API data
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** 18 or higher
- **npm** or **yarn**
- **React Native development environment** ([Setup Guide](https://reactnative.dev/docs/environment-setup))
  - For iOS: Xcode (macOS only)
  - For Android: Android Studio & Android SDK

### Installation

1. **Clone or extract the project**
   ```bash
   cd Customer-Search-Mobile-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the Application

#### Start the JSON Server (Mock API)
```bash
# In a separate terminal window
npm run json-server
# or
npx json-server --watch db.json --port 3001
```

The API will be available at:
- iOS Simulator: `http://localhost:3001/customers`
- Android Emulator: `http://10.0.2.2:3001/customers`
- Physical Device: `http://<YOUR_LOCAL_IP>:3001/customers`

**Note for Physical Devices:** Update the `LOCAL_IP` constant in `src/services/api/config.ts` with your machine's local IP address.

#### Start Metro Bundler
```bash
# In another terminal
npm start
# or
npx react-native start
```

#### Run on iOS
```bash
# In a third terminal
npm run ios
# or
npx react-native run-ios

# For specific simulator
npx react-native run-ios --simulator="iPhone 15"
```

#### Run on Android
```bash
# Make sure Android emulator is running or device is connected
npm run android
# or
npx react-native run-android
```

---

## ⚙️ Configuration System

### The Power of Configuration-Driven UI

This application's core strength is its configuration-driven architecture. All UI elements are generated dynamically from configuration objects, not hardcoded.

### How It Works

#### 1. Search Configuration (`src/config/appConfig.ts`)

```typescript
export const searchConfig: SearchConfig = {
  fields: {
    firstName: {
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter first name',
      renderOrder: 1,
      required: false,
    },
    lastName: {
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter last name',
      renderOrder: 2,
      required: false,
    },
    dateOfBirth: {
      type: 'date',
      label: 'Date of Birth',
      placeholder: 'Select date',
      renderOrder: 3,
      required: false,
    },
  },
};
```

#### 2. Display Configuration

Controls how customer data appears in lists and detail views:

```typescript
export const displayConfig: DisplayConfig = {
  listItem: {
    primaryFields: ['firstName', 'lastName'],
    secondaryFields: ['dateOfBirth'],
    formatter: (customer) => ({
      title: `${customer.firstName} ${customer.lastName}`,
      subtitle: `DOB: ${formatDate(customer.dateOfBirth)}`,
      details: [/* ... */],
    }),
  },
  detailSections: [
    {
      title: 'Basic Information',
      renderOrder: 1,
      fields: [/* ... */],
    },
    // More sections...
  ],
};
```

### Adding a New Search Field

**Example:** Add an "Email" search field

1. Open `src/config/appConfig.ts`
2. Add to `searchConfig.fields`:

```typescript
email: {
  type: 'email',
  label: 'Email Address',
  placeholder: 'Enter email',
  renderOrder: 4,  // Position in form
  required: false,
}
```

**That's it!** The form will automatically render the new field. No component changes needed.

### Adding a New Display Section

**Example:** Add a "Membership Info" section to the detail view

```typescript
{
  title: 'Membership Info',
  renderOrder: 4,
  fields: [
    { key: 'membershipId', label: 'Membership ID' },
    { 
      key: 'joinDate', 
      label: 'Join Date',
      format: (value) => formatDate(value)
    },
  ],
}
```

### Supported Field Types

- `text` - Standard text input
- `email` - Email keyboard
- `phone` - Phone pad
- `date` - Date picker
- `select` - Dropdown selection

---

## 🏗 Architecture & Design Decisions

### Component Architecture

```
┌─────────────────────────────────────┐
│         App (Navigation)            │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
   ┌───▼────┐     ┌───▼────────┐
   │ Search │────▶│  Results   │
   └────────┘     └─────┬──────┘
                        │
                   ┌────▼──────────┐
                   │ Customer      │
                   │ Detail        │
                   └───────────────┘
```

### Key Design Patterns

1. **Configuration Over Code**
   - UI structure defined in configuration objects
   - Components consume configuration dynamically
   - Easy to extend without modifying components

2. **Type Safety**
   - Comprehensive TypeScript types for all data structures
   - Compile-time error detection
   - Enhanced IDE autocomplete

3. **Separation of Concerns**
   - Components: UI rendering only
   - Services: API communication
   - Config: Business rules and display logic
   - Types: Data structure definitions

4. **Reusability**
   - `DynamicForm` can render any form from config
   - `FormField` handles multiple input types
   - `CustomerListItem` uses config for display

### Trade-offs & Decisions

#### ✅ Decisions Made

**React Native StyleSheet over styled-components**
- Pros: Native to RN, zero dependencies, better performance
- Cons: Less dynamic styling
- Verdict: StyleSheet is sufficient for this app's needs

**Axios over Fetch**
- Pros: Better error handling, interceptors, request cancellation
- Cons: Additional dependency
- Verdict: Axios provides better DX and error handling

**No UI Library (Paper/NativeBase)**
- Pros: Full control, smaller bundle, custom design
- Cons: More manual styling
- Verdict: Custom components give us exactly what we need

**JSON Server for API**
- Pros: Zero backend setup, RESTful, perfect for development
- Cons: Not production-ready
- Verdict: Ideal for demo and development

#### ⚠️ Known Limitations

1. **Date Input**: Currently uses text input with format hint. In production, would use a proper date picker component.

2. **Physical Device Setup**: Requires manual IP configuration for physical device testing.

3. **No Offline Support**: App requires active API connection. Would add local caching in production.

4. **Basic Validation**: Minimal input validation. Production app would have comprehensive validation rules.

---

## 🔧 API Integration

### Endpoints

Base URL is automatically configured based on platform:
- **iOS Simulator**: `http://localhost:3001`
- **Android Emulator**: `http://10.0.2.2:3001`
- **Physical Device**: `http://<YOUR_IP>:3001`

### Available Endpoints

```
GET  /customers              # Get all customers
GET  /customers?firstName_like=John  # Search by first name
GET  /customers?lastName_like=Doe    # Search by last name
GET  /customers?dateOfBirth=1985-03-15  # Search by DOB
GET  /customers/:id          # Get specific customer
```

### Service Layer (`src/services/api/customerService.ts`)

```typescript
// Search with criteria
const results = await searchCustomers({
  firstName: 'John',
  lastName: 'Doe'
});

// Get all
const all = await getAllCustomers();

// Get by ID
const customer = await getCustomerById('1');
```

---

## 🎯 Features in Detail

### 1. Search Screen
- Dynamic form generation from `searchConfig`
- Clear/Reset functionality
- Input validation
- Loading states
- Error handling with user-friendly messages

### 2. Results Screen
- List of matching customers
- Pull-to-refresh
- Empty state handling
- Loading indicators
- Tap to view details
- Back navigation

### 3. Customer Detail Screen
- Organized information sections
- Formatted data display (dates, phones, emails)
- Primary contact highlighting
- Multiple addresses support
- Clean, readable layout

---

## 🧪 Testing the App

### Test Scenarios

1. **Search by First Name**
   - Enter "John" → Should find John Doe

2. **Search by Last Name**
   - Enter "Smith" → Should find Jane Smith

3. **Search by Date of Birth**
   - Enter "1990-07-22" → Should find Jane Smith

4. **Combined Search**
   - First Name: "Robert", Last Name: "Brown"

5. **Empty Search**
   - Submit without criteria → Shows validation message

6. **No Results**
   - Search for "XYZ" → Shows empty state

7. **Pull to Refresh**
   - On results screen, pull down to refresh data

8. **Network Error**
   - Stop JSON server → See error handling

---

## 📸 Screenshots

### Architecture Flow
```
[Search Form]
     │
     ▼ (Submit Search)
[API Call]
     │
     ▼ (Results)
[List View] ←── (Pull to Refresh)
     │
     ▼ (Tap Customer)
[Detail View]
```

---

## 🔄 Future Enhancements

Potential improvements for production:

1. **Advanced Date Picker**
   - Use `@react-native-community/datetimepicker`
   - Better UX for date selection

2. **Offline Support**
   - Local caching with AsyncStorage
   - Offline-first architecture

3. **Advanced Search**
   - Filter by multiple criteria
   - Search history
   - Saved searches

4. **Enhanced Validation**
   - Real-time validation
   - Custom validation rules in config

5. **Analytics**
   - Track search patterns
   - User behavior insights

6. **Accessibility**
   - Screen reader support
   - Larger touch targets
   - High contrast mode

7. **Unit Tests**
   - Jest for component testing
   - API service tests
   - Integration tests

---

## ⏱ Time Spent

**Estimated Development Time:** 4-5 hours

Breakdown:
- Project setup & configuration: 30 mins
- Type definitions & config system: 45 mins
- API service layer: 30 mins
- Reusable components: 1 hour
- Screen implementations: 1.5 hours
- Navigation setup: 20 mins
- Testing & refinement: 45 mins
- Documentation: 30 mins

---

## 📚 Documentation

### Key Files to Understand

1. **`src/config/appConfig.ts`** - Start here! Contains all configuration
2. **`src/types/config.ts`** - Configuration type definitions
3. **`src/components/form/DynamicForm.tsx`** - Form rendering logic
4. **`src/services/api/customerService.ts`** - API integration

### Adding New Features

**To add a phone number search field:**

```typescript
// In src/config/appConfig.ts
phoneNumber: {
  type: 'phone',
  label: 'Phone Number',
  placeholder: 'Enter phone',
  renderOrder: 4,
}
```

**To add a new detail section:**

```typescript
// In displayConfig.detailSections
{
  title: 'Emergency Contact',
  renderOrder: 5,
  fields: [
    { key: 'emergencyName', label: 'Name' },
    { key: 'emergencyPhone', label: 'Phone' },
  ],
}
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Metro bundler won't start**
```bash
# Clear cache
npx react-native start --reset-cache
```

**Issue: Android build fails**
```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

**Issue: iOS pods error**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Issue: API not connecting**
- Ensure JSON server is running on port 3001
- Check `src/services/api/config.ts` for correct URL
- For physical devices, update LOCAL_IP

**Issue: TypeScript errors**
```bash
npm install --save-dev @types/react @types/react-native
```

---

## 📄 License

This project is created for Care247 as part of a technical assessment.

---

## 👨‍💻 About the Developer

**Rishik Kumar Chaurasiya**

- 📧 Email: rishikkumarchaurasiya@gmail.com
- 💼 LinkedIn: [linkedin.com/in/rishikkumar84ya](https://www.linkedin.com/in/rishikkumar84ya/)
- 🐙 GitHub: [github.com/rishikkumar84a](https://github.com/rishikkumar84a)

---

## 🙏 Acknowledgments

- React Native team for the excellent framework
- JSON Server for easy API mocking
- React Navigation for smooth navigation experience

---

**Built with ❤️ using React Native & TypeScript**
