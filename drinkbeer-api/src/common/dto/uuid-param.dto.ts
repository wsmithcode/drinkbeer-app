import { IsNotEmpty, IsUUID } from "class-validator";
import { AppErrors } from "src/constant/errors/error.message";

export class UUIDParamDto {

    @IsUUID('4', { message: AppErrors.ID.UUID_WRONG_FORMAT})
    @IsNotEmpty()
    id: string
}