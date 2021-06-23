import EnrollStudentRepository from "../repository/EnrollStudentRepository";
import RepositoryAbstractFactory from "../repository/factory/RepositoryAbstractFactory";
import {StatusEnrollStudent} from "../model/enum/StatusEnrollStudent";

export default class CancelEnrollStudentService {

    private studentRepository: EnrollStudentRepository;

    constructor(repositoryAbstractFactory: RepositoryAbstractFactory) {
        this.studentRepository = repositoryAbstractFactory.createEnrollmentRepository();
    }

    execute(enrollNumber: string) {
        this.studentRepository.changeStatus(enrollNumber, StatusEnrollStudent.CANCELED);
    }
}
