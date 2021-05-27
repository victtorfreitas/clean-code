import EnrollStudent from "./EnrollStudent";

test("Não deve matricular sem um nome de estudante válido", () => {
        const enrollStudent = new EnrollStudent();
        const enrollmentRequest = {
            student: {
                name: "Ana",
                cpf: "123.456.789-00"
            }
        }

        expect(() => enrollStudent.execute(enrollmentRequest))
            .toThrow(new Error("Nome do estudante invalido!"));
    }
);

test("Não deve matricular sem um cpf de estudante válido", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        student: {
            name: "Ana Clara",
            cpf: "027.297.121-00"
        }
    }

    expect(() => enrollStudent.execute(enrollmentRequest))
        .toThrow(new Error("Cpf do estudante invalido!"));
})