import { Hobby } from "./hobby";
import { Region } from "./region";

export class Preference {
    constructor(
        public minAge: number,
        public maxAge: number,
        public gender: string[],
        public hobbies: Hobby[]= [],
        public regions: Region[] = [],) {

    }
}
