import { ContestType } from "@/enums/ContestType";
import { ProblemType } from "@/enums/ProblemType";
import { IEntity } from 'jsql-api'

export interface IVSimpleProblems extends IEntity {
    id:                 bigint;
    entity_id:          bigint;
    author:           string;
    create_date:        Date;
    problem_type_name:       ProblemType;
    contest_name:       null | string;
    contest_short_name: null | string;
    contest_type:       ContestType | null;
    problem_name:       string;
    explication:        string;
    country_name:            string|null;
    difficulty:         number;
    points:             number;
    verified:           boolean;
}

export default interface IVProblems extends IVSimpleProblems {
    author_id: bigint;
    problem_type_id: number;
    contest_id: bigint | null;
    country_id: number|null;
}