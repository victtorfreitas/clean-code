import Classroom from "../model/Classroom";

export default interface ClassroomRepository {

    findBy(code: string, level: string, module: string): Classroom;

    findCapacityBy(code: string, level: string, module: string): number;

}