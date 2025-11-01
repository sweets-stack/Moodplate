export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.mjs'],
  moduleFileExtensions: ['mjs', 'js'],
  transform: {},
  collectCoverageFrom: [
    '**/*.mjs',
    '!node_modules/**',
    '!**/*.test.mjs'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};