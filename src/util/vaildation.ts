import { BadRequestException } from "@nestjs/common";

export const validationID = (id: string) => {
    //특문, 공백 제한
    const regExp = /^[a-zA-Z0-9]+$/i;
    if(!regExp.test(id)) throw new BadRequestException('ID는 특수문자, 공백이 포함되면 안됩니다.');
    else return true;
}