import RepositoryAbstractFactory from "./RepositoryAbstractFactory";
import ModuleRepositoryMemory from "../ModuleRepositoryMemory";
import ClassroomRepositoryMemory from "../ClassroomRepositoryMemory";
import EnrollStudentRepositoryMemory from "../EnrollStudentRepositoryMemory";

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {

    constructor() {

    }

    createModuleRepository() {
        return new ModuleRepositoryMemory();
    }

    createClassroomRepository() {
        return new ClassroomRepositoryMemory();
    }

    createEnrollmentRepository() {
        return new EnrollStudentRepositoryMemory();
    }
}