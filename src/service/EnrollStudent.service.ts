import EnrollStudentRepositoryMemory from "../repository/EnrollStudentRepositoryMemory";
import {StudentValidation} from "../validation/Student.validation";
import EnrollmentRequestValidation from "../validation/EnrollmentRequest.validation";
import EnrollmentRequest from "../dto/EnrollmentRequest";
import EnrollStudent from "../model/EnrollStudent";

export default class EnrollStudentService {

    private studentRepository: EnrollStudentRepositoryMemory;
    private studentValidation: StudentValidation;
    private enrollmentRequestValidation: EnrollmentRequestValidation;

    constructor() {
        this.studentRepository = new EnrollStudentRepositoryMemory();
        this.studentValidation = new StudentValidation(this.studentRepository);
        this.enrollmentRequestValidation = new EnrollmentRequestValidation();
    }

    execute(enrollmentRequest: EnrollmentRequest): string {
        const enrollStudent = new EnrollStudent(enrollmentRequest);
        this.studentValidation.execute(enrollmentRequest.student);
        this.enrollmentRequestValidation.execute(enrollStudent);
        this.enroll(enrollStudent);
        return enrollmentRequest.student.enrollNumber;
    }

    private enroll(enrollStudent: EnrollStudent) {
        const student = enrollStudent.student;
        student.enrollNumber = enrollStudent.generetedEnrollNumber(this.studentRepository.getNextSequence());
        this.studentRepository.persist(enrollStudent);
    }
}
