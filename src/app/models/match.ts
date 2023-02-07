import { User } from "./user";

export class Match {
    constructor(public user: User, public matchPercentage: number) { }
}