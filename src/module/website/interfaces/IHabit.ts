export interface HabitStep {
    id: number;
    habitId: number;
    stepCount: number;
    description: string;
    createDate: string;
    updateDate: string;
}

export interface HabitGoal {
    id: number;
    habitId: number;
    duration: number;
    score: number;
    actionDate: string;
    note?: string;
    createDate: string;
    updateDate: string;
}

export interface Habit {
    id: number;
    userId: number;
    type: string;
    description: string;
    createDate: string;
    updateDate: string;
    habitGoals: HabitGoal[];
    habitSteps: HabitStep[];
}