import Classroom from "../model/Classroom";
import ClassroomRepository from "./ClassroomRepository";
import DataBase from "./dataMemory/DataBase";

export default class ClassroomRepositoryMemory implements ClassroomRepository {

    findBy(code: string, level: string, module: string): Classroom {
        const classroom = DataBase.data.classrooms.find((classRoom: Classroom) =>
            classRoom.code === code &&
            classRoom.module === module &&
            classRoom.level === level
        );

        if (!classroom) throw new Error(`Classe ${code} não encontrada!`);

        return classroom;
    }

    findCapacityBy(code: string, level: string, module: string): number {
        return DataBase.data.classrooms.find((classroom: Classroom) =>
            classroom.code == code &&
            classroom.level == level &&
            classroom.module == module).capacity;
    }
}