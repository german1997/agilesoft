export class LoginRequest {
    username: string;
    password: string;

    constructor() {
        this.username = '';
        this.password = '';
    }
}

export class RefreshTokenRequest{
    refresh_token: string;

    constructor(){
        this.refresh_token = '';
    }
}