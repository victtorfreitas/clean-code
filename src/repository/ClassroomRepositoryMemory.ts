import Classroom from "../model/Classroom";
import ClassroomRepository from "./ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository {
    private classrooms!: Classroom[];

    constructor() {
        this.loadModules();
    }

    findByCode(code: string): Classroom {
        const classroom = this.classrooms.find((classRoom) => classRoom.code === code);

        if (!classroom) throw new Error(`Classe ${code} não encontrada!`);

        return classroom;
    }

    private loadModules() {
        this.classrooms = [{
            level: "EM",
            module: "3",
            code: "A",
            capacity: 10
        }]
    }

    findCapacityByCode(code: string): number {
        return 0;
    }
}