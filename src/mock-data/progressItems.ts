type ProgressIndicator = [string, number];

export interface ProgressItem {
    id: number;
    date: string;
    weight: number;
    indicators: ProgressIndicator[];
    diet: string;
}

export const progressItems: ProgressItem[] = [
    {
        id: 1,
        date: '19/03/2023',
        weight: 70,
        indicators: [
            ['pushups', 92],
            ['bench press', 50],
            ['incline dumbbell fly', 14],
            ['dumbbell shoulder press', 14],
            ['dumbbell shoulder fly', 8],
            ['rope pushdown triceps', 12.5],
            ['parallel bar dips', 38],
            ['pull-ups', 41],
            ['single-arm dumbbell row', 24],
            ['lat pulldown', 50],
            ['side lying dumbbell rear delt rise', 6],
            ['dumbbel curls', 12]
        ],
        diet: 'link_to_my_diet'
    }
];
