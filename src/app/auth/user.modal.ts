export class User {
    constructor(
        public email: string,
        public token?: string,
        public userId?: number,
        public first_name?: string,
        public last_name?: string,
        public company_name?: string,
        public country?: string,
        public require_password_change?: boolean
    ) {

    }
}