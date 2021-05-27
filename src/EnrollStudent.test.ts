import EnrollStudent from "./EnrollStudent";
import EnrollmentRequest from "./EnrollmentRequest";
import Student from "./Student";

test("Não deve matricular sem um nome de estudante válido", () => {
        const enrollStudent = new EnrollStudent();
        let student = new Student("Ana", "027.297.121-94");
        const enrollmentRequest = new EnrollmentRequest(student);

        expect(() => enrollStudent.execute(enrollmentRequest))
            .toThrow(new Error("Nome do estudante invalido!"));
    }
);

test("Não deve matricular sem um cpf de estudante válido", () => {
    const enrollStudent = new EnrollStudent();
    let student = new Student("Ana Clara", "027.297.121-00");
    const enrollmentRequest = new EnrollmentRequest(student);

    expect(() => enrollStudent.execute(enrollmentRequest))
        .toThrow(new Error("Cpf do estudante invalido!"));
});

test("Não deve matricular um aluno duplicado", () => {
    const enrollStudent = new EnrollStudent();
    let student = new Student("Ana Clara", "027.297.121-94");
    const enrollmentRequest = new EnrollmentRequest(student);

    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest))
        .toThrow(new Error("Não deve matricular um aluno duplicado"));
});