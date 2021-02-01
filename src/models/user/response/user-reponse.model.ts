export class UserResponse {
    data: DataUserResponse;

    constructor() {
        this.data = new DataUserResponse();
    }
}

export class DataUserResponse {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;

    constructor() {
        this.id = 0;
        this.username = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.createdAt = '';
    }


}