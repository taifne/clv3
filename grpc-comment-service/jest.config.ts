
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/build/'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^test/(.*)$": "<rootDir>/test/$1",
  }
}
  