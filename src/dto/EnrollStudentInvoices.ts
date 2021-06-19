import Student from "../model/Student";

export default class EnrollmentRequest {
    student: Student;
    level: string;
    module: string;
    classe: string;
    installments: number;
    issueDate: Date;

    constructor(student: Student, level: string,
                module: string, classroom: string,
                installments: number, issueDate: Date) {
        this.student = student;
        this.level = level;
        this.module = module;
        this.classe = classroom;
        this.installments = installments;
        this.issueDate = issueDate;
    }
}