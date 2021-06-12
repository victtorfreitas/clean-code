import Student from "./Student";
import EnrollmentRequest from "../dto/EnrollmentRequest";

export default class EnrollStudent {
    student: Student;
    level: string;
    module: string;
    classe: string;

    constructor(enrollRequest: EnrollmentRequest) {
        this.student = enrollRequest.student;
        this.level = enrollRequest.level;
        this.module = enrollRequest.module;
        this.classe = enrollRequest.classe;
    }

    public generetedEnrollNumber = (sequence: string): string => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}${this.level}${this.module}${this.classe}${sequence}`
    }
}