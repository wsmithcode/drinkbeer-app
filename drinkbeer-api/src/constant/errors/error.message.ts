export const AppErrors = {
    User: {
        NOT_FOUND: (type: string, value: string) => `User with ${type} ${value} not found`,
        ALREADY_EXIST: (type: string) => `User with this ${type} already exist`
    },
    Login: {
        FAIL: "Incorrect username or password. Try again"
    },
    ID: {
        UUID_WRONG_FORMAT: `ID must be a valid UUID`
    }
}