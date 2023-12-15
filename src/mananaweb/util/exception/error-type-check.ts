import { QueryFailedError } from "typeorm"
import { SendbirdBadRequestException } from "./customException";
import { DatabaseErrorException } from "./custom.db-error";

export const ErrorTypeCheck = (error: any) => {
    if (error instanceof QueryFailedError) {
        const { code, sqlMessage, sql } = error.driverError;
        throw new DatabaseErrorException(code, sqlMessage, `(query : ${sql})`);
    }

    //Sendbird Error -> Body
    if (error.body) {
        const { message, code } = JSON.parse(error.body);
        throw new SendbirdBadRequestException(message, code);
    }
}