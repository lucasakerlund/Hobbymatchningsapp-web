import { Hobby } from "./hobby";
import { Preference } from "./preference";
import { Region } from "./region";

export class User {

    constructor(
        public firstName: string,
        public surname: string,
        public username: string,
        public email: string,
        public birthdate: string,
        public personalRegion: Region,
        public gender: string,
        public description: string,
        public hobbies: Hobby[],
        public regions: Region[],
        public preference: Preference,
        public phoneNumber: string,
        public facebook: string,
        public discord: string,
        public snapchat: string,
        public instagram: string) { }
}