import EnrollStudent from "./EnrollStudent";
import EnrollmentRequest from "./EnrollmentRequest";
import Student from "./Student";
import {data} from "./Data";

const LEVEL = data.levels[1];
const MODULE = data.modules[1];
const CLASZ = data.classes[0];

test("Não deve matricular sem um nome de estudante válido", () => {
        const enrollStudent = new EnrollStudent();
        let student = new Student("Ana", "027.297.121-94", new Date('1995-26-11'));
        const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, MODULE.code, CLASZ.code);

        expect(() => enrollStudent.execute(enrollmentRequest))
            .toThrow(new Error("Nome do estudante invalido!"));
    }
);

test("Não deve matricular sem um cpf de estudante válido", () => {
    const enrollStudent = new EnrollStudent();
    let student = new Student("Ana Clara", "027.297.121-00", new Date('1995-26-11'));
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, MODULE.code, CLASZ.code);

    expect(() => enrollStudent.execute(enrollmentRequest))
        .toThrow(new Error("Cpf do estudante invalido!"));
});

test("Não deve matricular um aluno duplicado", () => {
    const enrollStudent = new EnrollStudent();
    let student = new Student("Ana Clara", "027.297.121-94", new Date('1995-26-11'));
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, MODULE.code, CLASZ.code);

    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular um aluno duplicado"));
});

test("Deve gerar o código de matrícula", () => {
    const enrollStudent = new EnrollStudent();
    const student = new Student("Ana Clara", "027.297.121-94", new Date('1995-26-11'));
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, MODULE.code, CLASZ.code);

    const enrollNumber = enrollStudent.execute(enrollmentRequest);
    const expectEnrollNumber = enrollmentRequest.generetedEnrollNumber(getSequenceNumber());

    expect(enrollNumber).toEqual(expectEnrollNumber);
});

const getSequenceNumber = () => {
    return "1".padStart(4, "0");
}