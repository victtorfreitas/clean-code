import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import {data} from "../../src/Data";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import Module from "../../src/model/Module";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import DataBase from "../../src/repository/dataMemory/DataBase";

const CLASSROOM = data.classes[0];

const moduleRepository = new ModuleRepositoryMemory();
let enrollStudentService: EnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    enrollStudentService = new EnrollStudentService();
})

test("Não deve matricular sem um nome de estudante válido", () => {
        let student = new Student("Ana", "027.297.121-94", new Date(1995, 11, 26));
        const anyModule = getModuleWithClassroom();

        const enrollmentRequest = new EnrollmentRequest(student, anyModule.level, anyModule.code, CLASSROOM.code);

        expect(() => enrollStudentService.execute(enrollmentRequest))
            .toThrow(new Error("Nome do estudante invalido!"));
    }
);

test("Não deve matricular sem um cpf de estudante válido", () => {
    let student = new Student("Ana Clara", "027.297.121-00", new Date(1995, 11, 26));
    const anyModule = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, anyModule.level, anyModule.code, CLASSROOM.code);

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Cpf do estudante invalido!"));
});

test("Não deve matricular um aluno duplicado", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const anyModule = getModuleWithClassroom();
    const enrollmentRequest = new EnrollmentRequest(student, anyModule.level, anyModule.code, CLASSROOM.code);

    enrollStudentService.execute(enrollmentRequest);
    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular um aluno duplicado"));
});

test("Deve gerar o código de matrícula", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const module = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, module.level, module.code, CLASSROOM.code);

    const enrollNumber = enrollStudentService.execute(enrollmentRequest);
    const expectEnrollNumber = `2021${module.level}${module.code}A0001`;

    expect(enrollNumber).toEqual(expectEnrollNumber);
});

test("Não deve matricular aluno abaixo da idade mínima", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date());
    const anyModule = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, anyModule.level, anyModule.code, CLASSROOM.code);

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular aluno abaixo da idade mínima"))
});

test("Não deve matricular aluno fora da capacidade da turma", () => {
    getValideStudents().forEach((student) => {
        const anyModule = getModuleWithClassroom();
        const enrollmentRequest = new EnrollmentRequest(student, anyModule.level, anyModule.code, CLASSROOM.code);
        enrollStudentService.execute(enrollmentRequest);
    })

    const student = new Student("Ana Carol", "339.605.820-80", new Date(1995, 11, 26));

    const anyModule = getModuleWithClassroom();
    const enrollmentRequest = new EnrollmentRequest(student, anyModule.level, anyModule.code, CLASSROOM.code);

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular aluno fora da capacidade da turma"))
});

const getValideStudents = (): Student[] => {
    return [
        new Student("Ana Claudia", "027.297.121-94", new Date(1995, 11, 26)),
        new Student("Ana Roberta", "614.481.700-01", new Date(1995, 11, 26)),
    ]
}

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findByCodeAndLevel("1","EM");
}

const getSequenceNumber = () => {
    return "1".padStart(4, "0");
}