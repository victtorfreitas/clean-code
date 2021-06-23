import EnrollStudentRepository from "./EnrollStudentRepository";
import EnrollStudent from "../model/EnrollStudent";
import DataBase from "./dataMemory/DataBase";
import {StatusEnrollStudent} from "../model/enum/StatusEnrollStudent";

export default class EnrollStudentRepositoryMemory implements EnrollStudentRepository {

    persist(enrollmentStudent: EnrollStudent) {
        DataBase.data.enrollStudents.push(enrollmentStudent);
    }

    existByCpf(cpf: string): boolean {
        return DataBase.data.enrollStudents.some((enrollStudent: EnrollStudent) => enrollStudent.student.cpf === cpf);
    }

    getNextSequence(): string {
        return (DataBase.data.enrollStudents.length + 1).toString().padStart(4, "0");
    }

    countBy(code: string, level: string, module: string): number {
        return DataBase.data.enrollStudents.filter(((enrollStudent: EnrollStudent) =>
            enrollStudent.classe.code === code &&
            enrollStudent.level === level &&
            enrollStudent.module.code === module)).length;
    }

    findByStudentEnrollNumber(enrollNumber: string): EnrollStudent {
        return DataBase.data.enrollStudents.find((enrollStudent: EnrollStudent) =>
            enrollStudent.student.enrollNumber === enrollNumber);
    }

    changeStatus(enrollNumber: string, status: StatusEnrollStudent) {
        const enrollStudent = this.findByStudentEnrollNumber(enrollNumber);
        enrollStudent.status = status;
    }
}