const tsconfig = require("./tsconfig.json")
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)


module.exports = {
  setupFiles: ['./tests/setup/setEnvironment.js'],
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  moduleNameMapper,
};
