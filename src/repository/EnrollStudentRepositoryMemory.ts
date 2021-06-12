import StudentRepository from "./StudentRepository";
import EnrollStudent from "../model/EnrollStudent";
import DataBase from "./dataMemory/DataBase";

export default class EnrollStudentRepositoryMemory implements StudentRepository {

    persist(enrollmentStudent: EnrollStudent) {
        DataBase.data.enrollStudents.push(enrollmentStudent);
    }

    existByCpf(cpf: string): boolean {
        return DataBase.data.enrollStudents.some((enrollStudent: EnrollStudent) => enrollStudent.student.cpf === cpf);
    }

    getNextSequence(): string {
        return (DataBase.data.enrollStudents.length + 1).toString().padStart(4, "0");
    }
}