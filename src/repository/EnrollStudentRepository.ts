import EnrollStudent from "../model/EnrollStudent";
import {StatusEnrollStudent} from "../model/enum/StatusEnrollStudent";

export default interface EnrollStudentRepository {
    persist(enrollStudent: EnrollStudent): void;

    existByCpf(cpf: string): boolean;

    getNextSequence(): string;

    countBy(code: string, level: string, module: string): number;

    findByStudentEnrollNumber(enrollNumber: string): EnrollStudent;

    changeStatus(enrollNumber: string, status: StatusEnrollStudent): void;
}