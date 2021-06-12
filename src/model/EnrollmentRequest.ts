import Student from "./Student";

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

    public generetedEnrollNumber = (sequence: string): string => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}${this.level}${this.module}${this.classe}${sequence}`
    }
}