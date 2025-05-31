/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/jest/styleMock.cjs',
    '\\.(jpg|jpeg|png|gif|svg|ico)$': '<rootDir>/jest/fileMock.cjs',
    '^@/(.*)$': '<rootDir>/src/$1',
    'webextension-polyfill': '<rootDir>/jest/__mocks__/webextension-polyfill.ts'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: 'tsconfig.json',
    }],
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
  ],
};
