import { NotFoundException } from "@nestjs/common";

export class QueryNFException extends NotFoundException {
    constructor(param: string) {
        super(`Query not found: ${param}`);
    }
}