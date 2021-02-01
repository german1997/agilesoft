export class LoginResponse {
    data: DataLoginResponse;

    constructor() {
        this.data = new DataLoginResponse();
    }
}

export class DataLoginResponse {
    payload: PayLoadResponse;
    user: UserResponse;

    constructor() {
        this.payload = new PayLoadResponse();
        this.user = new UserResponse();
    }
}

export class PayLoadResponse {
    refresh_token: string;
    token: string;
    type: string;

    constructor() {
        this.refresh_token = '';
        this.token = '';
        this.type = '';
    }
}

export class UserResponse {
    email: string = '';
    firstName: string = '';
    lastName: string = '';

    constructor() {
        this.email = '';
        this.firstName = '';
        this.lastName = '';
    }
}