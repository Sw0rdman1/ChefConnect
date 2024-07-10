import { objectToCamel, objectToSnake } from "ts-case-convert";

export const snakeToCamel = (request: any): any => objectToCamel(request);

export const camelToSnake = (request: any): any => objectToSnake(request);