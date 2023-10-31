//create channel Error
export class SendbirdBadRequestResponse400104 {
    message: "\"is_super\" must be a boolean.";
    code: 400104;
    error: true;
}
//userList get Error
export class SendbirdBadRequestResponse400105 {
    message: "\"metadatakey\" must be required.";
    code: 400105;
    error: true;
}

//createUser Error
export class SendbirdBadRequestResponse400111 {
    message: "Invalid value: \"channel_url. It takes only alphabets, numbers, hyphen and underscore.\".";
    code: 400111;
    error: true;
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
