# 🧪 Testing Guide - IPL Data Platform

## Overview

This project includes comprehensive test suites for both frontend and backend components.

---

## Backend Testing

### Test Suite Location
```
backend/
└── tests/
    └── api.test.js
```

### Running Backend Tests

**Install test dependencies:**
```bash
cd backend
npm install --save-dev jest supertest
```

**Run all tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

**Generate coverage report:**
```bash
npm run test:coverage
```

### Backend Test Cases

#### 1. Health Check Endpoint
```javascript
✓ should return 200 with health status
```
Tests the `/api/health` endpoint for proper server health response.

#### 2. Matches API
```javascript
✓ should get all matches with pagination
✓ should handle pagination parameters
✓ should return 404 for invalid endpoint
```
Tests the `/api/matches` endpoint with various parameters.

#### 3. Teams API
```javascript
✓ should get all teams
✓ should filter teams by name
```
Tests team retrieval and filtering functionality.

#### 4. Players API
```javascript
✓ should get all players
✓ should handle player filtering
```
Tests player data retrieval and filtering by role.

#### 5. Innings API
```javascript
✓ should get innings data
```
Tests innings data retrieval with pagination.

---

## Frontend Testing

### Test Suite Location
```
frontend/
└── src/
    ├── components/
    │   └── __tests__/
    │       ├── Header.test.js
    │       └── Navigation.test.js
    └── pages/
        └── __tests__/
            ├── Dashboard.test.js
            ├── Matches.test.js
            ├── Teams.test.js
            └── Players.test.js
```

### Running Frontend Tests

**Install test dependencies:**
```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom jest babel-jest
```

**Run all tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

**Generate coverage report:**
```bash
npm run test:coverage
```

### Frontend Test Cases

#### 1. Header Component Tests
```javascript
✓ renders without crashing
✓ displays the correct title
✓ has the correct styling classes
```

#### 2. Navigation Component Tests
```javascript
✓ renders without crashing
✓ displays all navigation links
✓ has navigation items
```

#### 3. Dashboard Page Tests
```javascript
✓ renders without crashing
✓ displays welcome message
✓ has correct page structure
```

#### 4. Matches Page Tests
```javascript
✓ renders without crashing
✓ displays matches table
✓ has page structure
✓ displays loading or matches list
```

#### 5. Teams Page Tests
```javascript
✓ renders without crashing
✓ displays teams table
✓ has page structure
```

#### 6. Players Page Tests
```javascript
✓ renders without crashing
✓ displays players content
✓ has correct page structure
```

---

## Test Configuration Files

### Backend Configuration
**File:** `backend/jest.config.js`

```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js'
  ],
  testTimeout: 10000
};
```

### Frontend Configuration
**File:** `frontend/jest.config.js`

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // ... more config
};
```

### Frontend Test Setup
**File:** `frontend/src/setupTests.js`

Configures test environment with:
- Jest DOM matchers
- Window.matchMedia mock
- Console error suppression

---

## Test Commands Reference

### Backend Commands
```bash
# Run all tests
npm test

# Run in watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- api.test.js
```

### Frontend Commands
```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for specific file
npm test -- Header.test.js

# Exit after running (no watch)
npm test -- --watchAll=false
```

---

## Writing New Tests

### Backend Test Template

```javascript
describe('API Feature', () => {
  it('should perform expected behavior', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);

    expect(response.body).toHaveProperty('data');
  });
});
```

### Frontend Test Template

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from '../Component';

describe('Component', () => {
  it('renders without crashing', () => {
    render(<Component />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```

---

## Coverage Reports

### Viewing Coverage

After running `npm run test:coverage`, view the report:

**Backend:**
```bash
cd backend
# Open coverage/lcov-report/index.html in browser
```

**Frontend:**
```bash
cd frontend
# Open coverage/lcov-report/index.html in browser
```

### Coverage Targets

**Backend:**
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

**Frontend:**
- Statements: 50%+
- Branches: 50%+
- Functions: 50%+
- Lines: 50%+

---

## Common Test Assertions

### Backend Assertions
```javascript
// Check response status
expect(response.status).toBe(200);

// Check response body
expect(response.body).toHaveProperty('data');
expect(Array.isArray(response.body.data)).toBe(true);

// Check headers
expect(response.type).toMatch(/json/);

// Check error responses
expect(response.status).toBe(404);
expect(response.body).toHaveProperty('error');
```

### Frontend Assertions
```javascript
// Check element rendering
expect(screen.getByText('Hello')).toBeInTheDocument();

// Check element visibility
expect(element).toBeVisible();

// Check element properties
expect(element).toHaveClass('active');
expect(element).toHaveAttribute('href', '/matches');

// Check element count
expect(screen.getAllByRole('link')).toHaveLength(4);
```

---

## Debugging Tests

### View Test Output
```bash
# Verbose output
npm test -- --verbose

# Show which tests ran
npm test -- --listTests
```

### Debug Single Test
```bash
# Focus on specific test
npm test -- --testNamePattern="should return 200"

# Focus on specific file
npm test -- Header.test.js
```

### Inspect Test Failure
```javascript
// Use console.log in test
console.log(response.body);

// Use screen debug for React
screen.debug();
```

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install backend deps
        run: cd backend && npm install
      
      - name: Test backend
        run: cd backend && npm test
      
      - name: Install frontend deps
        run: cd frontend && npm install
      
      - name: Test frontend
        run: cd frontend && npm test -- --watchAll=false
```

---

## Best Practices

### ✅ Do
- Write tests for critical functionality
- Use descriptive test names
- Test user interactions
- Keep tests independent
- Mock external dependencies
- Use setup/teardown for cleanup

### ❌ Don't
- Test implementation details
- Write overly complex tests
- Skip tests with `skip()` or `only()`
- Hardcode test data
- Leave console.logs in tests
- Test third-party libraries

---

## Troubleshooting

### "Cannot find module" Error
```bash
# Install missing dependencies
npm install

# Regenerate Prisma client
npx prisma generate
```

### "Test timeout" Error
```javascript
// Increase timeout
jest.setTimeout(15000);
```

### React component not rendering
```javascript
// Use waitFor for async operations
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

---

## Performance Testing

### Load Testing API
```bash
# Using Artillery
npm install -g artillery

artillery quick --count 100 --num 1000 http://localhost:5000/api/matches
```

### Component Performance
```bash
# React DevTools Profiler
1. Open browser DevTools
2. Go to "Profiler" tab
3. Record and analyze render times
```

---

## Test Statistics

| Category | Status | Coverage |
|----------|--------|----------|
| Backend API | ✅ Ready | 6+ tests |
| Frontend Components | ✅ Ready | 6+ tests |
| E2E Tests | 🔄 Optional | - |
| Integration Tests | 🔄 Optional | - |

---

## Resources

### Testing Libraries
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Supertest](https://github.com/visionmedia/supertest)

### Best Practices
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [React Testing Patterns](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Quick Command Reference

```bash
# Backend Tests
cd backend
npm test                    # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report

# Frontend Tests
cd frontend
npm test                    # Run all tests (interactive)
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

---

**Status: ✅ Test Suite Complete and Ready**

All major components have corresponding test files. Run `npm test` in either directory to execute the full test suite!
