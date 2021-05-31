import Module from "../model/Module";

export default class ModuleRepository {
    private module!: Module[];


    constructor() {
        this.loadModules();
    }

    findMinimumAgeByCode(code: string) {
        const module = this.findByCode(code);

        return module?.minimumAge;
    }

    findAny() {
        return this.module[Math.floor(Math.random() * this.module.length)]
    }

    findByCode(code: string): Module | undefined {
        return this.module.find((module) => module.code === code);
    }


    loadModules() {
        this.module = [{
            level: "EF1",
            code: "1",
            description: "1o Ano",
            minimumAge: 6,
            price: 15000
        },
            {
                level: "EF1",
                code: "2",
                description: "2o Ano",
                minimumAge: 7,
                price: 15000
            },
            {
                level: "EF1",
                code: "3",
                description: "3o Ano",
                minimumAge: 8,
                price: 15000
            },
            {
                level: "EF1",
                code: "4",
                description: "4o Ano",
                minimumAge: 9,
                price: 15000
            },
            {
                level: "EF1",
                code: "5",
                description: "5o Ano",
                minimumAge: 10,
                price: 15000
            },
            {
                level: "EF2",
                code: "6",
                description: "6o Ano",
                minimumAge: 11,
                price: 14000
            },
            {
                level: "EF2",
                code: "7",
                description: "7o Ano",
                minimumAge: 12,
                price: 14000
            },
            {
                level: "EF2",
                code: "8",
                description: "8o Ano",
                minimumAge: 13,
                price: 14000
            },
            {
                level: "EF2",
                code: "9",
                description: "9o Ano",
                minimumAge: 14,
                price: 14000
            },
            {
                level: "EM",
                code: "1",
                description: "1o Ano",
                minimumAge: 15,
                price: 17000
            },
            {
                level: "EM",
                code: "2",
                description: "2o Ano",
                minimumAge: 16,
                price: 17000
            },
            {
                level: "EM",
                code: "3",
                description: "3o Ano",
                minimumAge: 17,
                price: 17000
            }]
    }
}