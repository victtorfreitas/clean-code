import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import DataBase from "../../src/repository/dataMemory/DataBase";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import Module from "../../src/model/Module";
import GetEnrollStudentService from "../../src/service/GetEnrollStudent.service";
import RepositoryMemoryFactory from "../../src/repository/factory/RepositoryMemoryFactory";
import EnrollStudentService from "../../src/service/EnrollStudent.service";

const moduleRepository = new ModuleRepositoryMemory();
let getEnrollStudentService: GetEnrollStudentService;
let enrollStudentService: EnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    getEnrollStudentService = new GetEnrollStudentService(new RepositoryMemoryFactory());
    enrollStudentService = new EnrollStudentService(new RepositoryMemoryFactory());
})

test("Deve obter uma matrícula pelo código com o saldo das faturas", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const module = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, module.level,
        module.code, "A", 12, new Date());

    const enrollStudent = enrollStudentService.execute(enrollmentRequest);
    const enrollmentBalance = getEnrollStudentService.execute(enrollmentRequest);

    expect(enrollmentBalance.enrollNumber).toEqual(enrollStudent.student.enrollNumber);
    expect(enrollmentBalance.balance).toBe(16999.99);
});

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findByCodeAndLevel("1", "EM");
}