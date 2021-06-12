import EnrollStudent from "../model/EnrollStudent";

export default interface StudentRepository {
    persist(enrollStudent: EnrollStudent): void;

    existByCpf(cpf: string): boolean;

    getNextSequence(): string;
}