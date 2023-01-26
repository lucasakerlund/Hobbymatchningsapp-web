export class Contact {
   

    constructor(
        public userId: string,
        public status: string, 
        public firstName: string, 
        public surname: string, 
        public userName: String,
        public contactInformation: {
            discord: string,
            snapchat: string,
            instagram: string,
            facebook: string,
            email: string,
            phone: string;
        }
        ){
        

    }
}