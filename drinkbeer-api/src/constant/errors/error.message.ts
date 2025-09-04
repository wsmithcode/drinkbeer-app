export const AppErrors = {
    User: {
        NOT_FOUND: (id: string) => `User with id ${id} not found`
    },
    ID: {
        UUID_WRONG_FORMAT: ` ID must be a valid UUID`
    }
}