import DataBase from "../../src/repository/dataMemory/DataBase";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import RepositoryMemoryFactory from "../../src/repository/factory/RepositoryMemoryFactory";
import EnrollStudentService from "../../src/service/EnrollStudent.service";
import EnrollStudent from "../../src/model/EnrollStudent";
import EnrollStudentRepositoryMemory from "../../src/repository/EnrollStudentRepositoryMemory";
import Module from "../../src/model/Module";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import {StatusEnrollStudent} from "../../src/model/enum/StatusEnrollStudent";
import CancelEnrollStudentService from "../../src/service/CancelEnrollStudent.service";

const enrollStudentRepository = new EnrollStudentRepositoryMemory();
const moduleRepository = new ModuleRepositoryMemory();
let enrollStudentService: EnrollStudentService;
let cancelEnrollStudentService: CancelEnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    enrollStudentService = new EnrollStudentService(new RepositoryMemoryFactory());
    cancelEnrollStudentService = new CancelEnrollStudentService(new RepositoryMemoryFactory());
})

test("Deve cancelar uma matrícula", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const module = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, module.level,
        module.code, "A", 12, new Date());

    const enrollStudent = enrollStudentService.execute(enrollmentRequest);
    cancelEnrollStudentService.execute(enrollmentRequest.student.enrollNumber);

    const enrollStudentCanceled = getEnrollStudentBy(enrollStudent.student.enrollNumber);

    expect(enrollStudentCanceled.status).toBe(StatusEnrollStudent.CANCELED);
});

const getEnrollStudentBy = (enrollNumber: string): EnrollStudent => {
    return enrollStudentRepository.findByStudentEnrollNumber(enrollNumber);
}

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findByCodeAndLevel("1", "EM");
}