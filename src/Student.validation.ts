import Student from "./Student";
import CpfValidation from "./CpfValidation";
import StudentRepository from "./Student.repository";

export class StudentValidation {

    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
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
        if (this.studentRepository.findByCpf(cpf)) {
            throw new Error("Não deve matricular um aluno duplicado");
        }
    }
}