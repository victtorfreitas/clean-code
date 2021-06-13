import EnrollStudent from "../model/EnrollStudent";

export default interface EnrollStudentRepository {
    persist(enrollStudent: EnrollStudent): void;

    existByCpf(cpf: string): boolean;

    getNextSequence(): string;

    countBy(code: string, level: string, module: string): number;
}