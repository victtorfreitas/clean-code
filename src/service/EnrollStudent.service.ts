import StudentRepositoryMemory from "../repository/StudentRepositoryMemory";
import EnrollmentRequest from "../model/EnrollmentRequest";
import {StudentValidation} from "../validation/Student.validation";
import EnrollmentRequestValidation from "../validation/EnrollmentRequest.validation";

export default class EnrollStudentService {

    private studentRepository: StudentRepositoryMemory;
    private studentValidation: StudentValidation;
    private enrollmentRequestValidation: EnrollmentRequestValidation;

    constructor() {
        this.studentRepository = new StudentRepositoryMemory();
        this.studentValidation = new StudentValidation(this.studentRepository);
        this.enrollmentRequestValidation = new EnrollmentRequestValidation();
    }

    execute(enrollmentRequest: EnrollmentRequest): string {
        this.studentValidation.execute(enrollmentRequest.student);
        this.enrollmentRequestValidation.execute(enrollmentRequest);
        this.enroll(enrollmentRequest);
        return enrollmentRequest.student.enrollNumber;
    }

    private enroll(enrollmentRequest: EnrollmentRequest) {
        const student = enrollmentRequest.student;
        student.enrollNumber = enrollmentRequest.generetedEnrollNumber(this.studentRepository.getNextSequence());
        this.studentRepository.persist(student);
    }
}
