export interface IHomePageFunctionContent {
    display: string;
    link: string;
}

export interface IHomePageFunction {
    diary: IHomePageFunctionContent;
    finance: IHomePageFunctionContent;
    learnEnglish: IHomePageFunctionContent;
    skill: IHomePageFunctionContent;
    target: IHomePageFunctionContent;
    medicalRecord: IHomePageFunctionContent;
    information: IHomePageFunctionContent;
    relationship: IHomePageFunctionContent;
    habit: IHomePageFunctionContent;
}

export const HomePageFunction: IHomePageFunction = {
    diary: {
        display: "homePageFunction.diary",
        link: "diary"
    },
    finance: {
        display: "homePageFunction.finance",
        link: "finance"
    },
    learnEnglish: {
        display: "homePageFunction.learnEnglish",
        link: "learnEnglish"
    },
    target: {
        display: "homePageFunction.target",
        link: "target"
    },
    medicalRecord: {
        display: "homePageFunction.medicalRecord",
        link: "medicalRecord"
    },
    information: {
        display: "homePageFunction.information",
        link: "information"
    },
    relationship: {
        display: "homePageFunction.relationship",
        link: "relationship"
    },
    skill: {
        display: "homePageFunction.skill",
        link: "skill"
    },
    habit: {
        display: "homePageFunction.habit",
        link: "habit"
    },
}
