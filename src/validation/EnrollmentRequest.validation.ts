import EnrollmentRequest from "../model/EnrollmentRequest";
import DateUtil from "../util/Date.util";
import ModuleRepository from "../repository/Module.repository";

export default class EnrollmentRequestValidation {
    private moduleRepository: ModuleRepository;


    constructor() {
        this.moduleRepository = new ModuleRepository();
    }

    execute(enrollRequest: EnrollmentRequest) {
        const student = enrollRequest.student;
        this.validateMinAge(student.birthDate, enrollRequest.module)
    }

    private validateMinAge(birthDate: Date, moduleCode: string) {
        const age = DateUtil.getCalculeteAge(birthDate);
        const ageMinModule = this.moduleRepository.findMinimumAgeByCode(moduleCode);

        if (!ageMinModule || age < ageMinModule) {
            throw new Error("Não deve matricular aluno abaixo da idade mínima");
        }
    }
}