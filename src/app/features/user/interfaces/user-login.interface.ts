export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface IUseLogin {
    token: string;
    user: IUser;
}
