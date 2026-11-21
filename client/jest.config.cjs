module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/__mocks__/styleMock.cjs',
  },
}
