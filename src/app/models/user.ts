import { Hobby } from "./hobby";

export class User {
    firstName: string ='';
    surname: string =''
    username: string='';
    email: string='';
    gender: string='';
    description: string='';
    hobbies: Hobby[] = [];
}