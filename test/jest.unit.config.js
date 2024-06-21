module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '../test/unit',
  testMatch: ['**/*.spec.ts'],
  coverageDirectory: 'coverage/unit',
  collectCoverageFrom: ['**/*.ts'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-results/unit',
        outputName: 'junit.xml',
      },
    ],
  ],
};
