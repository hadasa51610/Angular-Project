export class User{
    constructor(
        public id: number,
        public userName: string,
        public password: string,
        public email: string,
        public role: string,
    ){}
}