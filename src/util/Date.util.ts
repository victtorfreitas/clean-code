export default class DateUtil {

    static getCalculeteAge(birthDate: Date) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    static getCalculateDateOfRange(startDate: Date, finisheDate: Date): number {
        let Difference_In_Time = finisheDate.getTime() - startDate.getTime();

        return Difference_In_Time / (1000 * 3600 * 24);
    }
}