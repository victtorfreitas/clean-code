import InvoiceEvent from "./event/InvoiceEvent";

export default class Invoice {
    code!: string;
    month!: number;
    year!: number;
    amount!: number;
    payed!: boolean;
    events!: InvoiceEvent[];

    constructor(code: string, month: number, year: number, amount: number) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.payed = false;
        this.events = [];
    }

    addEvent(invoiceEvent: InvoiceEvent) {
        this.events.push(invoiceEvent);
    }

    getBalance() {
        return this.events.reduce((total, event) => {
            total -= event.amount;
            return total;
        }, this.amount);
    }

}