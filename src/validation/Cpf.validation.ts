const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;
const MAX_DIGITS_1 = 9;
const MAX_DIGITS_2 = 10;

export default class CpfValidation {

    public static execute(cpf = ""): boolean {
        cpf = CpfValidation.extractDigits(cpf);
        if (CpfValidation.isInvalidLength(cpf)) return false;
        if (CpfValidation.isBlocked(cpf)) return false;
        const digit1 = CpfValidation.calculateDigit(cpf, FACTOR_DIGIT_1, MAX_DIGITS_1);
        const digit2 = CpfValidation.calculateDigit(cpf, FACTOR_DIGIT_2, MAX_DIGITS_2);
        let calculatedCheckDigit = `${digit1}${digit2}`;
        return CpfValidation.getCheckDigit(cpf) == calculatedCheckDigit;
    }

    private static extractDigits(cpf: string): string {
        return cpf.replace(/\D/g, "");
    }

    private static isInvalidLength(cpf: string): boolean {
        return cpf.length !== 11;
    }

    private static isBlocked(cpf: string): boolean {
        const [digit1] = cpf;
        return cpf.split("").every(digit => digit === digit1);
    }

    private static calculateDigit(cpf: string, factor: number, max: number): number {
        let total = 0;
        for (const digit of CpfValidation.toDigitArray(cpf).slice(0, max)) {
            total += digit * factor--;
        }
        return (total % 11 < 2) ? 0 : (11 - total % 11);
    }

    private static toDigitArray(cpf: string): number[] {
        return [...cpf].map(digit => parseInt(digit));
    }

    private static getCheckDigit(cpf: string): string {
        return cpf.slice(9);
    }
}