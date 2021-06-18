import EnrollStudent from "../EnrollStudent";
import Student from "../Student";
import Module from "../Module";
import Classroom from "../Classroom";

export default class EnrollStudentBuilder {
    private _student!: Student;
    private _level!: string;
    private _module!: Module;
    private _classroom!: Classroom;
    private _installments!: number;
    private _issueDate!: Date;


    constructor() {
    }

    public static builder(): EnrollStudentBuilder {
        return new EnrollStudentBuilder();
    }

    public student(student: Student): EnrollStudentBuilder {
        this._student = student;
        return this;
    }

    public level(level: string): EnrollStudentBuilder {
        this._level = level;
        return this;
    }

    public module(module: Module): EnrollStudentBuilder {
        this._module = module;
        return this;
    }

    public classroom(classroom: Classroom): EnrollStudentBuilder {
        this._classroom = classroom;
        return this;
    }

    public installments(installments: number): EnrollStudentBuilder {
        this._installments = installments;
        return this;
    }

    public issueDate(issueDate: Date): EnrollStudentBuilder {
        this._issueDate = issueDate;
        return this;
    }

    public build(): EnrollStudent {
        return new EnrollStudent(this._student, this._level,
            this._module, this._classroom,
            this._installments, this._issueDate);
    }
}