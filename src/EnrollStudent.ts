import CpfValidation from "./CpfValidation";

export default class EnrollStudent {

    execute(enrollmentRequest: any) {
        this.validateRequest(enrollmentRequest);

    }

    validateRequest(enrollmentRequest: any) {
        this.validateName(enrollmentRequest.student.name);
        this.validateCpf(enrollmentRequest.student.cpf);
    }

    private validateName(name: string) {
        if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name)) {
            throw new Error("Nome do estudante invalido!");
        }
    }

    private validateCpf(cpf: string) {
        if(!CpfValidation.execute(cpf)){
            throw new Error("Cpf do estudante invalido!");
        }
    }
}
