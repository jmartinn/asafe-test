# A-Safe Digital Safety Dashboard - Architecture Documentation

## System Architecture

This document outlines the technical architecture of the A-Safe Digital Safety Dashboard application, a Next.js-based web application for safety monitoring and incident management.

### High-Level Architecture

```
Client ⟷ Next.js App Router ⟷ Server Components/Actions ⟷ Data Layer
```

The application follows a modern architecture using Next.js 15's App Router with React Server Components and Server Actions, creating a hybrid application with both client and server rendering capabilities.

## Core Technologies

### Frontend

- **Next.js 15**: React framework with hybrid rendering capabilities
- **React 19**: UI library with improved server components support
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable component library built on Radix UI primitives
- **Recharts**: Charting library for data visualization
- **TanStack Table**: Data table library with advanced features

### Backend/Data Management

- **Server Components**: Server-rendered React components
- **Server Actions**: Next.js API for server-side data operations
- **Auth.js**: Authentication library (formerly NextAuth.js)
- **Zod**: Schema validation library

## Authentication Flow

The authentication system uses Auth.js with the credentials provider:

1. User submits credentials in the login form
2. Credentials are sent to the auth API route
3. Server validates credentials against stored user data
4. JWT session is created and stored in cookies
5. Middleware protects routes based on authentication status

## Data Flow Architecture

### Server-Side Data Fetching

1. Page requests are handled by Next.js App Router
2. Server components fetch initial data
3. Data is passed to client components via props
4. Page is rendered with complete data on first load

### Client-Side Data Operations

1. User interactions (filtering, sorting, etc.) are handled by React components
2. Data operations call server actions through useTransition hooks
3. Server actions process data and return results
4. Optimistic UI updates show immediate feedback while waiting for server response

## Performance Optimization Strategies

### Server-Side Rendering

- Critical UI components rendered on the server
- Initial HTML includes all necessary data
- Reduced Time-to-First-Contentful-Paint

### Streaming & Suspense

- Progressive loading of page content
- Skeleton loading states during data fetching
- Improved perceived performance

### Optimistic Updates

- UI updates immediately on user actions
- Server confirmation updates actual state
- Fallback mechanisms for failed operations

### Code Optimization

- Component-level code splitting
- Lazy loading of non-critical components
- Tree-shaking for minimal bundle size

## Large Dataset Handling

### Server-Side Data Processing

```
Client Request → Server Action → Data Processing → Return Processed Subset
```

The application handles large datasets efficiently through:

1. Server-side filtering, sorting, and pagination
2. Only transferring required data to the client
3. Optimized data structures for fast operations
4. Caching strategies for repeated queries

The `getIncidents` server action processes data requests with these steps:
1. Apply filters based on request parameters
2. Apply sorting based on column and direction
3. Calculate total filtered count
4. Apply pagination
5. Return only the needed page of data

## Component Architecture

The application follows a hierarchical component structure:

- **Page Components**: Top-level components for routes
- **Layout Components**: Define the structure of pages
- **Feature Components**: Implement specific features (tables, charts)
- **UI Components**: Reusable UI elements from shadcn/ui

### Data Table Architecture

```
IncidentsPage → IncidentsTableWrapper → DataTable → [Toolbar, Table, Pagination]
```

This layered approach separates concerns:
- **IncidentsPage**: Server component that fetches initial data
- **IncidentsTableWrapper**: Client component that uses the useIncidents hook
- **DataTable**: Presentational component that handles rendering

## Custom Hooks

The application includes custom hooks for reusable logic:

### useIncidents Hook

This hook centralizes data fetching and state management for incidents:

```typescript
const {
  data,
  pageCount,
  pagination,
  setPagination,
  sorting,
  setSorting,
  // ...other state and methods
} = useIncidents({ initialData });
```

It provides:
- Data fetching logic
- Pagination state management
- Sorting and filtering control
- Loading state tracking
- Optimistic UI updates

## Schema Validation

The application uses Zod for runtime schema validation:

```typescript
export const incidentSchema = z.object({
  id: z.string(),
  location: z.string(),
  type: incidentTypeEnum,
  severity: severityEnum,
  status: statusEnum,
  date: z.string(),
});

export type Incident = z.infer<typeof incidentSchema>;
```

Benefits:
- Runtime type safety
- Consistent validation across client and server
- Self-documenting data structures
- Integration with form libraries

## Mobile Optimization

The application is optimized for mobile devices through:

1. Responsive design using Tailwind CSS
2. Simplified layouts for small screens
3. Touch-friendly UI elements
4. Reduced data transmission for mobile networks

## Error Handling Strategy

The application implements multi-layered error handling:

1. Form validation using Zod schemas
2. Try/catch blocks in server actions
3. Error states in UI components
4. Fallback UI for failed data loading
5. Error boundaries for component isolation

## Future Architecture Enhancements

Planned architectural improvements:

1. **Caching Layer**: Implement React Cache for data caching
2. **Real-time Updates**: WebSocket integration for live data
3. **Analytics Pipeline**: Data processing for insights
4. **Offline Support**: Service Worker for offline functionality

## Development Workflow

The development process follows these practices:

1. **Type-Driven Development**: Define types before implementation
2. **Component-First Development**: Build and test components in isolation
3. **Progressive Enhancement**: Core functionality first, then enhancements
4. **Test-Driven Development**: Write tests before implementation

## Testing Strategy

The application includes a comprehensive testing approach:

1. **Unit Tests**: Individual component and function testing
2. **Integration Tests**: Testing component interactions
3. **E2E Tests**: Full application flow testing with Cypress
4. **Performance Tests**: Lighthouse and custom performance metrics

## Deployment Architecture

The application is designed for deployment on Vercel or similar platforms:

1. **CI/CD Pipeline**: Automated testing and deployment
2. **Edge Caching**: CDN distribution for static assets
3. **Serverless Functions**: For server actions and API routes
4. **Environment Separation**: Development, staging, production environments 