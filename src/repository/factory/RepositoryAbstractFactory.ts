import ModuleRepository from "../ModuleRepository";
import ClassroomRepository from "../ClassroomRepository";
import EnrollStudentRepository from "../EnrollStudentRepository";

export default interface RepositoryAbstractFactory {
    createModuleRepository(): ModuleRepository;

    createClassroomRepository(): ClassroomRepository;

    createEnrollmentRepository(): EnrollStudentRepository;
}