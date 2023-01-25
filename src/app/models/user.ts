import { Hobby } from "./hobby";
import { Gender, } from "./gender";
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
    genderPreference!: Gender;
}