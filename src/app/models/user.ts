import { Hobby } from "./hobby";
import { Preference } from "./preference";
import { Region } from "./region";

export class User {
    firstName: string ='';
    surname: string =''
    username: string='';
    email: string='';
    personalRegion!: Region;
    gender: string='';
    description: string='';
    hobbies: Hobby[] = [];
    regions: Region[] = [];
    preference!: Preference;
    phoneNumber!: string;
    facebook!: string;
    discord!: string;
    snapchat!: string;
}