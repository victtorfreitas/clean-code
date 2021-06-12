import Student from "../model/Student";
import CpfValidation from "./Cpf.validation";
import EnrollStudentRepositoryMemory from "../repository/EnrollStudentRepositoryMemory";

export class StudentValidation {

    private studentRepository: EnrollStudentRepositoryMemory;

    constructor(studentRepository: EnrollStudentRepositoryMemory) {
        this.studentRepository = studentRepository;
    }

    execute(student: Student) {
        this.validateName(student.name);
        this.validateCpf(student.cpf);
        this.validateUnique(student.cpf);
    }


    private validateName(name: string) {
        if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name)) {
            throw new Error("Nome do estudante invalido!");
        }
    }

    private validateCpf(cpf: string) {
        if (!CpfValidation.execute(cpf)) {
            throw new Error("Cpf do estudante invalido!");
        }
    }

    private validateUnique(cpf: string) {
        if (this.studentRepository.existByCpf(cpf)) {
            throw new Error("Não deve matricular um aluno duplicado");
        }
    }
}