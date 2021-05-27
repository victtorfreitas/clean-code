import CpfValidation from "./CpfValidation";
import StudentRepository from "./StudentRepository";
import Student from "./Student";
import EnrollmentRequest from "./EnrollmentRequest";

export default class EnrollStudent {

    private studentRepository: StudentRepository;

    constructor() {
        this.studentRepository = new StudentRepository();
    }

    execute(enrollmentRequest: EnrollmentRequest) {
        this.validateRequest(enrollmentRequest);
        this.enroll(enrollmentRequest.student);
    }

    validateRequest(enrollmentRequest: any) {
        this.validateName(enrollmentRequest.student.name);
        this.validateCpf(enrollmentRequest.student.cpf);
        this.validateUnique(enrollmentRequest.student);
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

    private validateUnique(student: Student) {
        if (this.studentRepository.findByCpf(student.cpf)) {
            throw new Error("Não deve matricular um aluno duplicado");
        }
    }

    private enroll(student: Student) {
        this.studentRepository.persist(student);
    }
}
