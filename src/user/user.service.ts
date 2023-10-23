import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(){}

    async signin(id: string, pw: string) {
        if(!this.validationID(id)) return null;

        if(id === 'diehreo') return this.adminSignin(pw);
        else return null;
    }

    validationID(id: string) {
        //특문, 공백 제한
        const regExp = /^[a-zA-Z0-9]+$/i;
        if(!regExp.test(id)) throw new BadRequestException('ID는 특수문자, 공백이 포함되면 안됩니다.');
        else return true;
    }

    adminSignin(pw: string) {
        const realPW = '!231231Aa';
        return pw === realPW ? true : false;
    }
}

