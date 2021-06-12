import Classroom from "../model/Classroom";
import ClassroomRepository from "./ClassroomRepository";
import DataBase from "./dataMemory/DataBase";

export default class ClassroomRepositoryMemory implements ClassroomRepository {

    findByCode(code: string): Classroom {
        const classroom = DataBase.data.classrooms.find((classRoom: Classroom) => classRoom.code === code);

        if (!classroom) throw new Error(`Classe ${code} não encontrada!`);

        return classroom;
    }

    findCapacityByCode(code: string): number {
        return 0;
    }
}