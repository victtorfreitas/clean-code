import Student from "../model/Student";
import StudentRepository from "./StudentRepository";

export default class StudentRepositoryMemory implements StudentRepository {
    private students: Student[] = []

    persist(student: Student) {
        this.students.push(student);
    }

    existByCpf(cpf: string): boolean {
        return this.students.some((student) => student.cpf === cpf);
    }

    getNextSequence(): string {
        return (this.students.length + 1).toString().padStart(4, "0");
    }
}