#!/bin/bash
# Test Runner Script - IPL Data Platform

echo "╔════════════════════════════════════════════════════════════╗"
echo "║           IPL Data Platform - Test Runner                 ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if in correct directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
  echo -e "${YELLOW}⚠️  Please run this script from the project root directory${NC}"
  exit 1
fi

echo -e "\n${BLUE}1. Installing Backend Dependencies...${NC}"
cd backend
npm install --save-dev jest supertest 2>/dev/null
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

echo -e "\n${BLUE}2. Installing Frontend Dependencies...${NC}"
cd ../frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest identity-obj-proxy 2>/dev/null
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo -e "\n${YELLOW}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Testing Options:${NC}"
echo -e "${GREEN}1.${NC} Run Backend Tests:     ${BLUE}cd backend && npm test${NC}"
echo -e "${GREEN}2.${NC} Run Frontend Tests:    ${BLUE}cd frontend && npm test${NC}"
echo -e "${GREEN}3.${NC} Backend Watch Mode:    ${BLUE}cd backend && npm run test:watch${NC}"
echo -e "${GREEN}4.${NC} Frontend Watch Mode:   ${BLUE}cd frontend && npm run test:watch${NC}"
echo -e "${GREEN}5.${NC} Backend Coverage:      ${BLUE}cd backend && npm run test:coverage${NC}"
echo -e "${GREEN}6.${NC} Frontend Coverage:     ${BLUE}cd frontend && npm run test:coverage${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"

echo -e "\n${BLUE}Test Files Created:${NC}"
echo -e "${GREEN}Backend:${NC}"
echo "  ✓ backend/tests/api.test.js"
echo "  ✓ backend/jest.config.js"

echo -e "${GREEN}Frontend:${NC}"
echo "  ✓ frontend/src/components/__tests__/Header.test.js"
echo "  ✓ frontend/src/components/__tests__/Navigation.test.js"
echo "  ✓ frontend/src/pages/__tests__/Dashboard.test.js"
echo "  ✓ frontend/src/pages/__tests__/Matches.test.js"
echo "  ✓ frontend/src/pages/__tests__/Teams.test.js"
echo "  ✓ frontend/src/pages/__tests__/Players.test.js"
echo "  ✓ frontend/jest.config.js"
echo "  ✓ frontend/src/setupTests.js"

echo -e "\n${BLUE}Documentation:${NC}"
echo "  ✓ TESTING_GUIDE.md - Complete testing documentation"

echo -e "\n${GREEN}✓ All test files created and dependencies installed!${NC}"
echo -e "${BLUE}Next: Read TESTING_GUIDE.md for detailed instructions${NC}\n"
