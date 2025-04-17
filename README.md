# A-Safe Digital Safety Dashboard

## Overview

A real-time safety monitoring dashboard built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This application provides safety professionals with a comprehensive overview of incidents, locations, and critical safety metrics across facilities.

![Dashboard Preview](https://via.placeholder.com/800x450.png?text=A-Safe+Dashboard)

## 🔍 Features

- **Secure Authentication**: Email/password authentication with protected routes
- **Interactive Dashboard**: Real-time data visualization with comprehensive metrics
- **Advanced Data Tables**: Handle 1000+ records with server-side pagination, sorting, and filtering
- **Chart Visualizations**: Interactive charts for incident analysis and trend monitoring
- **Responsive Design**: Full mobile compatibility with optimized layouts
- **Dark/Light Theme**: Automatic theme detection with manual override
- **Optimized Performance**: Leverages Next.js 15's latest features for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18.0+
- pnpm 9.8.0+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/asafe-test.git
cd asafe-test

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Development Credentials

- Admin: `admin@asafe.com` / `password123`
- User: `user@asafe.com` / `password123`

## 🏗️ Architecture

### Project Structure

```
├── app/                    # Next.js App Router structure
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Dashboard routes and pages
│   ├── actions/            # Server actions for data operations
│   └── api/                # API routes
├── components/             # UI components
│   ├── ui/                 # Core UI components (shadcn/ui)
│   └── providers/          # Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and schemas
│   ├── data/               # Mock data sources
│   └── schemas/            # Zod schemas for validation
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI primitives)
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: Server Actions
- **Authentication**: Auth.js (formerly NextAuth.js)
- **Data Visualization**: Recharts
- **Data Tables**: TanStack Table v8

## 🌐 Technical Implementation

### Authentication Strategy

The application implements a secure authentication system using Auth.js with credential-based authentication. This approach:

- Secures routes using middleware
- Stores JWTs for session management
- Provides a clean, user-friendly login experience
- Implements proper authentication state handling with React hooks

### Data Fetching and State Management

The application uses Next.js 15's server components and server actions to optimize data fetching:

- **Server Components**: Initial data is loaded on the server for fast page loads
- **Server Actions**: Secure, type-safe functions for data operations
- **Streaming with Suspense**: Progressive loading with optimized user experience
- **Custom Hooks**: `useIncidents` hook for streamlined data access and manipulation

### Performance Optimizations

Several techniques are employed to ensure optimal performance:

1. **Server-side Rendering**: Critical data is rendered on the server first
2. **Component Code-splitting**: Automatic code-splitting for smaller initial JS payload
3. **Optimistic Updates**: UI updates immediately while server operations complete
4. **Progressive Loading**: Skeleton states during data fetching
5. **Efficient Pagination**: Server-side pagination for large datasets

### Large Dataset Handling

The application efficiently handles large datasets (1000+ records) through:

- **Server-side Operations**: Filtering, sorting, and pagination handled on the server
- **Virtualization**: Only render visible rows for improved performance
- **Optimized Data Structures**: Efficient data processing algorithms
- **Progressive Loading**: Stream data in chunks for better user experience

### Mobile Optimization

The dashboard is fully responsive with specific optimizations for mobile devices:

- **Responsive Layout**: Adapts to different screen sizes
- **Touch-friendly UI**: Larger touch targets and mobile-specific interactions
- **Reduced Network Payload**: Optimized assets and code splitting
- **Performance Metrics**: Meets Lighthouse mobile performance standards

## 📋 Development Process

### Code Organization

- **Feature-based Structure**: Components organized by feature
- **Type Safety**: Comprehensive TypeScript types with Zod validation
- **Clean Code**: ESLint and Prettier for consistent code style
- **Component Isolation**: Self-contained components with clear interfaces

### Best Practices

- **Accessibility**: ARIA attributes and keyboard navigation
- **SEO Optimization**: Proper metadata and semantic HTML
- **Error Handling**: Comprehensive error states and fallbacks
- **Testing**: Unit tests for critical components

## 🧪 Development and Testing

### Running Tests

```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

### Building for Production

```bash
# Create a production build
pnpm build

# Start the production server
pnpm start
```

## 🛣️ Roadmap

- [ ] Add real-time data updates with WebSockets
- [ ] Implement geospatial visualization for location data
- [ ] Add report generation and export functionality
- [ ] Expand analytics with predictive incident modeling

## 📝 License

This project was created as a technical test and is not licensed for production use.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Auth.js](https://authjs.dev/)
- [Recharts](https://recharts.org/)
