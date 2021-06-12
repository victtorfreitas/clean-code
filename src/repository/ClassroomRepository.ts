import Classroom from "../model/Classroom";

export default interface ClassroomRepository {
    findByCode(code: string): Classroom;

    findCapacityByCode(code: string): number;
}