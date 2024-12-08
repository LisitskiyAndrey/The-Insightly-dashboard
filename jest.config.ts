export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}
