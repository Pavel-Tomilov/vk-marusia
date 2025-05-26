module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.svg\\?react$": "<rootDir>/mocks/svgMock.js",
    "\\.(jpg|jpeg|png|svg|gif|webp|avif)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
