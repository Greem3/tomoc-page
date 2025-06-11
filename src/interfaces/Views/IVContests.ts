import { ContestType } from "@/enums/ContestType";
import { IEntity } from "jsql-api";


export interface IVSimpleContests extends IEntity {
    id: number;
    name: string;
    short_name: string;
    type: ContestType;
}

export default interface IVContests extends IVSimpleContests {
    year_made: number;
}