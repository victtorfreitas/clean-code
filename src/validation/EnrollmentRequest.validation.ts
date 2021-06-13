import EnrollStudent from "../model/EnrollStudent";
import DateUtil from "../util/Date.util";
import ModuleRepositoryMemory from "../repository/ModuleRepositoryMemory";
import ClassroomRepositoryMemory from "../repository/ClassroomRepositoryMemory";
import EnrollStudentRepositoryMemory from "../repository/EnrollStudentRepositoryMemory";

export default class EnrollmentRequestValidation {
    private moduleRepository: ModuleRepositoryMemory;
    private classroomRepositoryMemory: ClassroomRepositoryMemory;
    private enrollStudentRepositoryMemory: EnrollStudentRepositoryMemory;


    constructor() {
        this.moduleRepository = new ModuleRepositoryMemory();
        this.classroomRepositoryMemory = new ClassroomRepositoryMemory();
        this.enrollStudentRepositoryMemory = new EnrollStudentRepositoryMemory();
    }

    execute(enrollRequest: EnrollStudent) {
        const student = enrollRequest.student;
        this.validateClassroomNotFineshed(enrollRequest.classe, enrollRequest.module, enrollRequest.level);
        this.validateClassroomStarted(enrollRequest.classe, enrollRequest.module, enrollRequest.level);
        this.validateMinAge(student.birthDate, enrollRequest.module, enrollRequest.level);
        this.validateCapacity(enrollRequest.classe, enrollRequest.module, enrollRequest.level);
    }

    private validateMinAge(birthDate: Date, moduleCode: string, levelCode: string) {
        const age = DateUtil.getCalculeteAge(birthDate);
        const ageMinModule = this.moduleRepository.findMinimumAgeByCode(moduleCode, levelCode);

        if (age < ageMinModule) {
            throw new Error("Não deve matricular aluno abaixo da idade mínima");
        }
    }

    private validateCapacity(code: string, module: string, level: string) {
        const capacityClassroomTotal = this.classroomRepositoryMemory.findCapacityBy(code, level, module);
        const capacityClassroomCurrent = this.enrollStudentRepositoryMemory.countBy(code, level, module);

        if (capacityClassroomTotal == capacityClassroomCurrent)
            throw new Error("Não deve matricular aluno fora da capacidade da turma");
    }

    private validateClassroomNotFineshed(classe: string, module: string, level: string) {
        const classroom = this.classroomRepositoryMemory.findBy(classe, level, module);
        const dataAtual = new Date().getTime();

        if (dataAtual > classroom.endDate.getTime())
            throw new Error("Não deve matricular depois do fim das aulas");
    }

    private validateClassroomStarted(classe: string, module: string, level: string) {
        const classroom = this.classroomRepositoryMemory.findBy(classe, level, module);
        const dataAtual = new Date();

        const everyDayOfTheRange = DateUtil.getCalculateDateOfRange(classroom.startDate, classroom.endDate);
        const everyDayUntilToday = DateUtil.getCalculateDateOfRange(classroom.startDate, dataAtual);

        const percentageOfDaysLost = (100 * everyDayUntilToday) / everyDayOfTheRange;
        const daysLatePercentageLimit = 25;

        if (percentageOfDaysLost > daysLatePercentageLimit) {
            throw new Error("Não deve matricular depois de 25% do início das aulas")

        }
    }
}