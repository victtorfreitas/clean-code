import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import DataBase from "../../src/repository/dataMemory/DataBase";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import Module from "../../src/model/Module";
import RepositoryMemoryFactory from "../../src/repository/factory/RepositoryMemoryFactory";
import EnrollStudentService from "../../src/service/EnrollStudent.service";
import PayInvoiceService from "../../src/service/PayInvoice.service";
import EnrollStudent from "../../src/model/EnrollStudent";
import PayInvoices from "../../src/dto/PayInvoices";
import GetEnrollStudentService from "../../src/service/GetEnrollStudent.service";

const moduleRepository = new ModuleRepositoryMemory();
let payInvoiceService: PayInvoiceService;
let enrollStudentService: EnrollStudentService;
let getEnrollStudentService: GetEnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    payInvoiceService = new PayInvoiceService(new RepositoryMemoryFactory());
    enrollStudentService = new EnrollStudentService(new RepositoryMemoryFactory());
    getEnrollStudentService = new GetEnrollStudentService(new RepositoryMemoryFactory());
})

test("Deve pagar uma fatura da matrícula", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const module = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, module.level,
        module.code, "A", 12, new Date());

    const enrollStudent = enrollStudentService.execute(enrollmentRequest);
    const payInvoice = getPayInvoice(enrollStudent);
    payInvoiceService.execute(payInvoice);
    const enrollmentBalance = getEnrollStudentService.execute(enrollmentRequest);

    expect(enrollmentBalance.balance).toBe(16499.99);
});

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findByCodeAndLevel("1", "EM");
}

const getPayInvoice = (enrollStudent: EnrollStudent) => {
    return new PayInvoices(enrollStudent.student.enrollNumber, 1, 2021, 500);
}