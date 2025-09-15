export const AppErrors = {
  User: {
    NOT_FOUND: (type: string, value: string) =>
      `User with ${type} ${value} not found`,
    ALREADY_EXIST: (type: string) => `User with this ${type} already exist`,
  },
  Group: {
    NOTFOUND: (type: string, value: string) =>
      `Group with ${type} ${value} not found`,
  },
  Login: {
    FAIL: 'Incorrect username or password. Try again !',
  },
  ID: {
    UUID_WRONG_FORMAT: `ID must be a valid UUID`,
  },
  DATABASE: {
    SCHEMA_ERROR: 'Configuration Error',
  },
  ALCOHOLIMPORT: {
    FAIL: 'Failed to import cocktails data',
    API_KEY_MISSING: (provider: string) =>
      `API key form ${provider} is missing in the environment variables`,
  },
};
