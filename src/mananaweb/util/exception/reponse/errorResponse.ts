//create channel Error
export class SendbirdBadRequestResponse400104 {
    message: string;
    code: number;
    error: boolean;
}
//userList get Error
export class SendbirdBadRequestResponse400105 {
    message: string;
    code: number;
    error: boolean;
}

//createUser Error
export class SendbirdBadRequestResponse400111 {
    message: string;
    code: 400111;
    error: boolean;
}

//User, Channel NF Error
export class SendbirdBadRequestResponse400201 {
    params: string;
    message: string;
    code: number;
    error: boolean;

    constructor(params: string) {
        this.params = params;
        this.message = params ? `${this.params} not found.` : 'User or Channel not found';
        this.code = 400201;
        this.error = true;
    }
}

//User Create >> duplicate ID
export class SendbirdBadRequestResponse400202 {
    message: string;
    code: 400202;
    error: boolean;
}