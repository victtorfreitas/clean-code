export default class EnrollStudent {

    execute(enrollmentRequest: any) {
        if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(enrollmentRequest.student.name)) {
            throw new Error("Nome do estudante invalido!");
        }
    }
}
