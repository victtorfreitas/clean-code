import EnrollStudentService from "../../src/service/EnrollStudent.service";
import EnrollmentRequest from "../../src/model/EnrollmentRequest";
import Student from "../../src/model/Student";
import {data} from "../../src/Data";
import ModuleRepository from "../../src/repository/Module.repository";

const LEVEL = data.levels[1];
const CLASZ = data.classes[0];

const moduleRepository = new ModuleRepository();
let enrollStudentService: EnrollStudentService;

beforeEach(() => {
    enrollStudentService = new EnrollStudentService();
})

test("Não deve matricular sem um nome de estudante válido", () => {
        let student = new Student("Ana", "027.297.121-94", new Date(1995, 11, 26));
        const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, getAnyModuleCode(), CLASZ.code);

        expect(() => enrollStudentService.execute(enrollmentRequest))
            .toThrow(new Error("Nome do estudante invalido!"));
    }
);

test("Não deve matricular sem um cpf de estudante válido", () => {
    let student = new Student("Ana Clara", "027.297.121-00", new Date(1995, 11, 26));
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, getAnyModuleCode(), CLASZ.code);

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Cpf do estudante invalido!"));
});

test("Não deve matricular um aluno duplicado", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, getAnyModuleCode(), CLASZ.code);

    enrollStudentService.execute(enrollmentRequest);
    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular um aluno duplicado"));
});

test("Deve gerar o código de matrícula", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, getAnyModuleCode(), CLASZ.code);

    const enrollNumber = enrollStudentService.execute(enrollmentRequest);
    const expectEnrollNumber = enrollmentRequest.generetedEnrollNumber(getSequenceNumber());

    expect(enrollNumber).toEqual(expectEnrollNumber);
});

test("Não deve matricular aluno abaixo da idade mínima", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date());
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, getAnyModuleCode(), CLASZ.code);

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular aluno abaixo da idade mínima"))
});

const getAnyModuleCode = (): string => {
    return moduleRepository.findAny().code
}

const getSequenceNumber = () => {
    return "1".padStart(4, "0");
}