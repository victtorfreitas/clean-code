import EnrollStudent from "./EnrollStudent";

test("Não deve matricular sem um nome de estudante válido", function () {
        const enrollStudent = new EnrollStudent();
        const enrollmentRequest = {
            student: {
                name: "Ana"
            }
        }
        expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Nome do estudante invalido!"))
    }
);