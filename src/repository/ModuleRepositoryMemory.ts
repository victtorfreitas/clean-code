import Module from "../model/Module";
import ModuleRepository from "./ModuleRepository";
import DataBase from "./dataMemory/DataBase";

export default class ModuleRepositoryMemory implements ModuleRepository {

    findMinimumAgeByCode(code: string, level: string): number {
        const module = this.findByCodeAndLevel(code, level);

        return module?.minimumAge!;
    }

    findAny() {
        return DataBase.data.modules[Math.floor(Math.random() * DataBase.data.modules.length)]
    }

    findByCodeAndLevel(code: string, level: string): Module {
        const module = DataBase.data.modules.find((module: Module) => module.code === code && module.level === level);

        if (!module) throw new Error(`Modulo ${code} com level ${level} não encontrado!`);

        return module;
    }
}