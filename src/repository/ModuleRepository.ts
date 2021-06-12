import Module from "../model/Module";

export default interface ModuleRepository {
    findMinimumAgeByCode(code: string, level: string): number;

    findAny(): Module;

    findByCodeAndLevel(code: string, level: string): Module;
}