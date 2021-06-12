import Student from "../model/Student";

export default class EnrollmentRequest {
    student: Student;
    level: string;
    module: string;
    classe: string;

    constructor(student: Student, level: string, module: string, clasz: string) {
        this.student = student;
        this.level = level;
        this.module = module;
        this.classe = clasz;
    }
}