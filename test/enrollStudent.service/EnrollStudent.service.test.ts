import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import Module from "../../src/model/Module";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import DataBase from "../../src/repository/dataMemory/DataBase";
import RepositoryMemoryFactory from "../../src/repository/factory/RepositoryMemoryFactory";

const moduleRepository = new ModuleRepositoryMemory();
let enrollStudentService: EnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    enrollStudentService = new EnrollStudentService(new RepositoryMemoryFactory());
})

test("Não deve matricular sem um nome de estudante válido", () => {
        let student = new Student("Ana", "027.297.121-94", new Date(1995, 11, 26));
        const anyModule = getModuleWithClassroom();

        const enrollmentRequest = new EnrollmentRequest(student, anyModule.level,
            anyModule.code, "A", 10, new Date());

        expect(() => enrollStudentService.execute(enrollmentRequest))
            .toThrow(new Error("Nome do estudante invalido!"));
    }
);

test("Não deve matricular sem um cpf de estudante válido", () => {
    let student = new Student("Ana Clara", "027.297.121-00", new Date(1995, 11, 26));
    const anyModule = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, anyModule.level,
        anyModule.code, "A", 10, new Date());

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Cpf do estudante invalido!"));
});

test("Não deve matricular um aluno duplicado", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const anyModule = getModuleWithClassroom();
    const enrollmentRequest = new EnrollmentRequest(student, anyModule.level,
        anyModule.code, "A", 10, new Date());

    enrollStudentService.execute(enrollmentRequest);
    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular um aluno duplicado"));
});

test("Deve gerar o código de matrícula", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const module = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, module.level,
        module.code, "A", 10, new Date());

    const enrollStudent = enrollStudentService.execute(enrollmentRequest);
    const expectEnrollNumber = `2021${module.level}${module.code}A0001`;

    expect(enrollStudent.student.enrollNumber).toEqual(expectEnrollNumber);
});

test("Não deve matricular aluno abaixo da idade mínima", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date());
    const anyModule = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, anyModule.level,
        anyModule.code, "A", 10, new Date());

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular aluno abaixo da idade mínima"))
});

test("Não deve matricular aluno fora da capacidade da turma", () => {
    const anyModule = getModuleWithClassroom();
    getValideStudents().forEach((student) => {
        const enrollmentRequest = new EnrollmentRequest(student, anyModule.level,
            anyModule.code, "A", 10, new Date());
        enrollStudentService.execute(enrollmentRequest);
    })

    const student = new Student("Ana Carol", "339.605.820-80", new Date(1995, 11, 26));
    const enrollmentRequest = new EnrollmentRequest(student, anyModule.level,
        anyModule.code, "A", 10, new Date());

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular aluno fora da capacidade da turma"))
});

test("Não deve matricular depois do fim das aulas", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const module = getModuleWithClassroomFinished();

    const enrollmentRequest = new EnrollmentRequest(student, module.level,
        module.code, "B", 10, new Date());

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular depois do fim das aulas"))
});

test("Não deve matricular depois de 25% do início das aulas", () => {
    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const module = getModuleWithClassroomStarted();

    const enrollmentRequest = new EnrollmentRequest(student, module.level,
        module.code, "C", 10, new Date());

    expect(() => enrollStudentService.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular depois de 25% do início das aulas"))
});

test("Deve gerar as faturas de acordo com o número de parcelas," +
    " arredondando o valor e aplicando o resto para a última fatura", () => {

    const student = new Student("Ana Clara", "027.297.121-94", new Date(1995, 11, 26));
    const module = getModuleWithClassroom();

    const enrollmentRequest = new EnrollmentRequest(student, module.level,
        module.code, "A", 12, new Date());

    const enrollStudent = enrollStudentService.execute(enrollmentRequest);

    expect(enrollStudent.invoices).toHaveLength(12);
    expect(enrollStudent.invoices[0].amount).toBe(1416.66);
    expect(enrollStudent.invoices[11].amount).toBe(1416.73);
});


const getValideStudents = (): Student[] => {
    return [
        new Student("Ana Claudia", "027.297.121-94", new Date(1995, 11, 26)),
        new Student("Ana Roberta", "614.481.700-01", new Date(1995, 11, 26)),
    ]
}

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findByCodeAndLevel("1", "EM");
}
const getModuleWithClassroomFinished = (): Module => {
    return moduleRepository.findByCodeAndLevel("3", "EM");
}

const getModuleWithClassroomStarted = (): Module => {
    return moduleRepository.findByCodeAndLevel("3", "EM");
}

const getSequenceNumber = () => {
    return "1".padStart(4, "0");
}