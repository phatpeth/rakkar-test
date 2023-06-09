import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  //   preset: "ts-jest",
  rootDir: ".",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
