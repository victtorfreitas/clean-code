import EnrollmentRequest from "../model/EnrollmentRequest";
import DateUtil from "../util/Date.util";
import ModuleRepositoryMemory from "../repository/ModuleRepositoryMemory";
import ClassroomRepositoryMemory from "../repository/ClassroomRepositoryMemory";

export default class EnrollmentRequestValidation {
    private moduleRepository: ModuleRepositoryMemory;
    private classroomRepositoryMemory: ClassroomRepositoryMemory;


    constructor() {
        this.moduleRepository = new ModuleRepositoryMemory();
        this.classroomRepositoryMemory = new ClassroomRepositoryMemory();
    }

    execute(enrollRequest: EnrollmentRequest) {
        const student = enrollRequest.student;
        this.validateMinAge(student.birthDate, enrollRequest.module, enrollRequest.level);
        this.validateCapacity(enrollRequest.classe);
    }

    private validateMinAge(birthDate: Date, moduleCode: string, levelCode: string) {
        const age = DateUtil.getCalculeteAge(birthDate);
        const ageMinModule = this.moduleRepository.findMinimumAgeByCode(moduleCode, levelCode);

        if (age < ageMinModule) {
            throw new Error("Não deve matricular aluno abaixo da idade mínima");
        }
    }

    private validateCapacity(classe: string) {

    }
}