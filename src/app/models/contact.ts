import { ContactInformation } from "./contact-information";

export class Contact {
   

    constructor(
        public userId: string,
        public status: string, 
        public firstName: string, 
        public surname: string, 
        public username: String,
        public contactInformation: ContactInformation){ }
}