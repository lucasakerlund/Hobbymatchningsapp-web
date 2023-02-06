import { ContactInformation } from "./contact-information";
import { Hobby } from "./hobby";
import { Preference } from "./preference";
import { Region } from "./region";

export class User {

    constructor(
        public userId: string,
        public username: string,
        public description: string,
        public firstName: string,
        public surname: string,
        public birthdate: string,
        public region: Region,
        public gender: string,
        public preferences: Preference,
        public contactInformation: ContactInformation) { }
}