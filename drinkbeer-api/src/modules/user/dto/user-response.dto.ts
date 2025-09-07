import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserResponseDto {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    password: string

    @Expose()
    avatar?: string

    @Expose()
    createdAt: string
}