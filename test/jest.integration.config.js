module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '../test/integration',
    testMatch: ['**/*.spec.ts'],
    coverageDirectory: '../coverage/integration',
    collectCoverageFrom: ['**/*.ts'],
  };