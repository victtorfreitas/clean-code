import EnrollmentRequest from "../dto/EnrollmentRequest";
import ModuleRepository from "../repository/ModuleRepository";
import EnrollStudentRepository from "../repository/EnrollStudentRepository";
import ClassroomRepository from "../repository/ClassroomRepository";
import RepositoryAbstractFactory from "../repository/factory/RepositoryAbstractFactory";
import EnrollmentBalance from "../dto/EnrollmentBalance";

export default class GetEnrollStudentService {

    private studentRepository: EnrollStudentRepository;
    private moduleRepository: ModuleRepository;
    private classroomRepository: ClassroomRepository;

    constructor(repositoryAbstractFactory: RepositoryAbstractFactory) {
        this.studentRepository = repositoryAbstractFactory.createEnrollmentRepository();
        this.moduleRepository = repositoryAbstractFactory.createModuleRepository()
        this.classroomRepository = repositoryAbstractFactory.createClassroomRepository()
    }

    execute(enrollmentRequest: EnrollmentRequest): EnrollmentBalance {
        const enrollStudent = this.studentRepository.findByStudentEnrollNumber(enrollmentRequest.student.enrollNumber);
        return new EnrollmentBalance(enrollStudent.student.enrollNumber, enrollStudent.getInvoiceBalance());
    }
}
