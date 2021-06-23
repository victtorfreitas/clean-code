import Student from "./Student";
import Invoice from "./Invoice";
import Module from "./Module";
import Classroom from "./Classroom";
import InvoiceEvent from "./event/InvoiceEvent";
import {StatusEnrollStudent} from "./enum/StatusEnrollStudent";

export default class EnrollStudent {
    student: Student;
    level: string;
    module: Module;
    classe: Classroom;
    installments: number;
    invoices!: Invoice[];
    issueDate: Date;
    status: StatusEnrollStudent;


    constructor(student: Student, level: string,
                module: Module, classe: Classroom,
                installments: number, issueDate: Date) {
        this.student = student;
        this.level = level;
        this.module = module;
        this.classe = classe;
        this.installments = installments;
        this.issueDate = issueDate;
        this.invoices = [];
        this.status = StatusEnrollStudent.REGISTERED;
    }

    public generetedEnrollNumber = (sequence: string): string => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}${this.level}${this.module.code}${this.classe.code}${sequence}`
    }

    public generetedInvoices(): void {
        let installmentAmount = Math.trunc((this.module.price / this.installments) * 100) / 100;
        for (let i = 1; i <= this.installments; i++) {
            this.invoices.push(new Invoice(this.student.enrollNumber, i, this.issueDate.getFullYear(), installmentAmount));
        }
        const total = this.invoices.reduce((total, invoice) => {
            total += invoice.amount;
            return total;
        }, 0);
        const rest = Math.trunc((this.module.price - total) * 100) / 100
        this.invoices[this.installments - 1].amount = installmentAmount + rest;
    }

    getInvoiceBalance(): number {
        return this.invoices.reduce((total, invoice) => {
            total += invoice.getBalance();
            return total;
        }, 0);
    }

    getInvoice(month: number, year: number): Invoice {
        return this.invoices.find(invoice => invoice.month === month && invoice.year === year)!;
    }

    payInvoice(month: number, year: number, amount: number) {
        const invoice = this.getInvoice(month, year);
        if (!invoice) throw new Error("Fatura não encontrada!");
        const invoiceEvent = new InvoiceEvent("Pagamento", amount);
        invoice.addEvent(invoiceEvent);
    }
}