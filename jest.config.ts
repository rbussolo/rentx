import { pathsToModuleNameMapper } from "ts-jest/utils";

import { compilerOptions } from "./tsconfig.json";

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  rootDir: "./",
  moduleNameMapper: pathsToModuleNameMapper(
    {
      "@modules/*": ["modules/*"],
      "@config/*": ["config/*"],
      "@shared/*": ["shared/*"],
      "@errors/*": ["errors/*"],
      "@utils/*": ["utils/*"],
    },
    {
      prefix: "<rootDir>/src/",
    }
  ),
  preset: "ts-jest",
  testMatch: ["**/**.spec.ts"],
};
