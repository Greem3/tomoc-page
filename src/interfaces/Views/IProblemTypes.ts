import { IEntity } from "jsql-api";


export interface IProblemTypes extends IEntity {
    id: bigint;
    name: string;
    short_name: string|null;
}