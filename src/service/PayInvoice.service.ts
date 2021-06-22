import EnrollStudentRepository from "../repository/EnrollStudentRepository";
import RepositoryAbstractFactory from "../repository/factory/RepositoryAbstractFactory";
import PayInvoices from "../dto/PayInvoices";

export default class PayInvoiceService {

    private studentRepository: EnrollStudentRepository;

    constructor(repositoryAbstractFactory: RepositoryAbstractFactory) {
        this.studentRepository = repositoryAbstractFactory.createEnrollmentRepository();
    }

    execute(payInvoice: PayInvoices) {
        const enrollStudent = this.studentRepository.findByStudentEnrollNumber(payInvoice.enrollNumber);
        enrollStudent.payInvoice(payInvoice.month, payInvoice.year, payInvoice.amount);
    }
}
