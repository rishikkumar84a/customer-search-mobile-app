# 🏗 Application Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Customer Search Application                  │
│                         (React Native)                           │
└─────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
            ┌───────▼───────┐ ┌──▼──────┐ ┌────▼──────┐
            │  Search       │ │ Results │ │ Customer  │
            │  Screen       │ │ Screen  │ │ Detail    │
            └───────┬───────┘ └──┬──────┘ └────┬──────┘
                    │             │             │
                    └─────────────┼─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │   Configuration System     │
                    │  (searchConfig,            │
                    │   displayConfig)           │
                    └─────────────┬──────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │    API Service Layer       │
                    │  (customerService)         │
                    └─────────────┬──────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │     JSON Server API        │
                    │    (db.json - Mock)        │
                    └────────────────────────────┘
```

## Component Hierarchy

```
App
 └── RootNavigator
      ├── SearchScreen
      │    └── DynamicForm
      │         └── FormField (x3)
      │              ├── TextInput (firstName)
      │              ├── TextInput (lastName)
      │              └── TextInput (dateOfBirth)
      │
      ├── ResultsScreen
      │    └── FlatList
      │         └── CustomerListItem (xN)
      │
      └── CustomerDetailScreen
           └── ScrollView
                └── Section (x3)
                     ├── Basic Information
                     ├── Addresses
                     └── Contact Information
```

## Data Flow

### Search Flow
```
User Input (Search Form)
         │
         ▼
    FormField Components
         │
         ▼
    DynamicForm (collects values)
         │
         ▼
    SearchScreen (onSubmit)
         │
         ▼
    customerService.searchCustomers()
         │
         ▼
    Axios → JSON Server API
         │
         ▼
    GET /customers?firstName_like=...
         │
         ▼
    Results Array
         │
         ▼
    Navigate to ResultsScreen
         │
         ▼
    Display CustomerListItem for each
```

### Detail View Flow
```
Tap CustomerListItem
         │
         ▼
    Navigate to CustomerDetailScreen
         │
         ▼
    displayConfig.detailSections
         │
         ▼
    Sort by renderOrder
         │
         ▼
    Map sections → UI
         │
         ▼
    Apply format functions
         │
         ▼
    Display formatted data
```

## Configuration-Driven Architecture

### How Configuration Drives UI

```
┌────────────────────────┐
│   searchConfig.ts      │
│                        │
│  fields: {             │
│    firstName: {        │
│      type: 'text',     │
│      label: '...',     │
│      renderOrder: 1    │
│    }                   │
│  }                     │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│   DynamicForm.tsx      │
│                        │
│  - Reads config        │
│  - Sorts by order      │
│  - Maps to FormField   │
│  - Generates form      │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│     FormField.tsx      │
│                        │
│  - Renders based on    │
│    field.type          │
│  - Applies validation  │
│  - Handles input       │
└────────────────────────┘
```

## File Structure by Responsibility

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
├─────────────────────────────────────────────────────────┤
│  src/screens/                                           │
│    ├── SearchScreen.tsx         - Search interface      │
│    ├── ResultsScreen.tsx        - Results list          │
│    └── CustomerDetailScreen.tsx - Detail view           │
├─────────────────────────────────────────────────────────┤
│  src/components/                                        │
│    ├── form/                                            │
│    │   ├── DynamicForm.tsx      - Config-driven form   │
│    │   └── FormField.tsx        - Field renderer       │
│    └── customer/                                        │
│        └── CustomerListItem.tsx - List item display    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   CONFIGURATION LAYER                    │
├─────────────────────────────────────────────────────────┤
│  src/config/                                            │
│    └── appConfig.ts             - Main configuration    │
│        ├── searchConfig         - Search form config    │
│        └── displayConfig        - Display config        │
├─────────────────────────────────────────────────────────┤
│  src/types/                                             │
│    ├── config.ts                - Config type defs      │
│    └── customer.ts              - Customer type defs    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                        │
├─────────────────────────────────────────────────────────┤
│  src/services/api/                                      │
│    ├── customerService.ts       - API operations        │
│    └── config.ts                - API configuration     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    NAVIGATION LAYER                      │
├─────────────────────────────────────────────────────────┤
│  src/navigation/                                        │
│    ├── RootNavigator.tsx        - Nav container         │
│    └── types.ts                 - Nav type defs         │
└─────────────────────────────────────────────────────────┘
```

## Screen Navigation Flow

```
┌──────────────┐
│ SearchScreen │ (Initial)
└──────┬───────┘
       │
       │ (Submit search)
       ▼
┌──────────────┐
│ResultsScreen │
└──────┬───────┘
       │
       │ (Tap customer)
       ▼
┌──────────────────┐
│CustomerDetail    │
│Screen            │
└──────┬───────────┘
       │
       │ (Back button)
       ▼
     [Returns to ResultsScreen or SearchScreen]
```

## API Request Flow

```
Component
    │
    ▼
customerService.searchCustomers(criteria)
    │
    ▼
Axios Instance
    │
    ▼
Platform Detection (iOS/Android/Physical)
    │
    ▼
Correct Base URL
    │
    ▼
HTTP GET Request
    │
    ▼
JSON Server
    │
    ▼
db.json (filtering)
    │
    ▼
Response (Customer[])
    │
    ▼
Error Handling
    │
    ▼
Return to Component
```

## Configuration Extension Points

```
Adding New Feature
        │
        ├─ New Search Field?
        │       │
        │       └─> Edit searchConfig.fields
        │
        ├─ New Display Field?
        │       │
        │       └─> Edit displayConfig.listItem.formatter
        │
        ├─ New Detail Section?
        │       │
        │       └─> Edit displayConfig.detailSections
        │
        └─ New Field Type?
                │
                └─> Add to FormField.tsx switch statement
```

## Type Safety Flow

```
TypeScript Definitions (src/types/)
         │
         ├─ customer.ts
         │   └─> Customer, Address, Phone, Email interfaces
         │
         └─ config.ts
             └─> FieldConfig, SearchConfig, DisplayConfig interfaces
                      │
                      ▼
              Used by Components
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
  DynamicForm    FormField   CustomerListItem
        │             │             │
        └─────────────┴─────────────┘
                      │
                      ▼
              Compile-time checking
              Runtime type safety
```

## Error Handling Architecture

```
User Action
    │
    ▼
Component Try/Catch
    │
    ├─ Success Path
    │   └─> Display data
    │
    └─ Error Path
        │
        ▼
    handleApiError()
        │
        ├─ Network Error
        │   └─> "Check connection & server"
        │
        ├─ Server Error
        │   └─> "Server error: {message}"
        │
        └─ Unknown Error
            └─> "Unexpected error occurred"
                    │
                    ▼
              Alert.alert() or Error UI
```

## State Management

```
Component State (useState)
         │
    ┌────┼────┐
    │    │    │
    ▼    ▼    ▼
  Form  List Detail
  Values Items  Data
    │    │    │
    └────┼────┘
         │
         ▼
    Updated via:
    - User input
    - API responses
    - Navigation params
```

## Performance Optimizations

1. **FlatList** - Virtualized list rendering
2. **React Navigation** - Lazy screen loading
3. **Memoization** - Config sorting cached
4. **Platform-specific API URLs** - Optimized per platform

## Security Considerations

1. **Input Sanitization** - Validation on form fields
2. **Type Safety** - TypeScript prevents type errors
3. **Error Messages** - No sensitive info exposed
4. **API Configuration** - Environment-based URLs

---

## Key Architectural Benefits

✅ **Separation of Concerns** - Clear responsibility boundaries  
✅ **Extensibility** - Easy to add new features  
✅ **Maintainability** - Changes isolated to config  
✅ **Type Safety** - Compile-time error detection  
✅ **Reusability** - Components work with any config  
✅ **Testability** - Pure functions, clear interfaces  

---

**Understanding this architecture will help you extend and maintain the application effectively!**
