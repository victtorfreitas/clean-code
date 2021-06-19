import {StudentValidation} from "../validation/Student.validation";
import EnrollmentRequestValidation from "../validation/EnrollmentRequest.validation";
import EnrollmentRequest from "../dto/EnrollmentRequest";
import EnrollStudent from "../model/EnrollStudent";
import ModuleRepository from "../repository/ModuleRepository";
import EnrollStudentRepository from "../repository/EnrollStudentRepository";
import ClassroomRepository from "../repository/ClassroomRepository";
import EnrollStudentBuilder from "../model/builder/EnrollStudentBuilder";
import RepositoryAbstractFactory from "../repository/factory/RepositoryAbstractFactory";

export default class EnrollStudentService {

    private studentRepository: EnrollStudentRepository;
    private moduleRepository: ModuleRepository;
    private classroomRepository: ClassroomRepository;
    private studentValidation: StudentValidation;
    private enrollmentRequestValidation: EnrollmentRequestValidation;

    constructor(repositoryAbstractFactory: RepositoryAbstractFactory) {
        this.studentRepository = repositoryAbstractFactory.createEnrollmentRepository();
        this.moduleRepository = repositoryAbstractFactory.createModuleRepository()
        this.classroomRepository = repositoryAbstractFactory.createClassroomRepository()
        this.studentValidation = new StudentValidation(this.studentRepository);
        this.enrollmentRequestValidation = new EnrollmentRequestValidation();
    }

    execute(enrollmentRequest: EnrollmentRequest): EnrollStudent {
        const enrollStudent = this.requestToEntity(enrollmentRequest);
        this.studentValidation.execute(enrollmentRequest.student);
        this.enrollmentRequestValidation.execute(enrollStudent);
        this.enroll(enrollStudent);
        return enrollStudent;
    }

    private enroll(enrollStudent: EnrollStudent) {
        const student = enrollStudent.student;
        student.enrollNumber = enrollStudent.generetedEnrollNumber(this.studentRepository.getNextSequence());
        enrollStudent.generetedInvoices();
        this.studentRepository.persist(enrollStudent);
    }

    private requestToEntity(enrollmentRequest: EnrollmentRequest): EnrollStudent {
        const module = this.moduleRepository.findByCodeAndLevel(enrollmentRequest.module, enrollmentRequest.level);
        const classroom = this.classroomRepository.findBy(enrollmentRequest.classe, enrollmentRequest.level, module.code);

        return EnrollStudentBuilder.builder()
            .student(enrollmentRequest.student)
            .level(enrollmentRequest.level)
            .module(module)
            .classroom(classroom)
            .installments(enrollmentRequest.installments)
            .issueDate(enrollmentRequest.issueDate)
            .build();
    }
}
