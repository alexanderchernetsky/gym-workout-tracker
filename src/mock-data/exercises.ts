export interface Exercise {
    id: number,
    name: string,
    muscleTypes: string,
    image: string,
}

export const exercises: Exercise[] = [
    {
        id: 1,
        name: 'pull ups',
        muscleTypes: 'back',
        image: 'pull-ups.jpeg',
    },
    {
        id: 2,
        name: 'single arm dumbbell row',
        muscleTypes: 'back',
        image: 'single-arm-dumbbell-row.jpeg',
    },
    {
        id: 3,
        name: 'triangle bar lat pull-down',
        muscleTypes: 'back',
        image: 'triangle-bar-lat-pull-down.png',
    },
    {
        id: 4,
        name: 'side lying dumbbell rear delt raise',
        muscleTypes: 'rear delts',
        image: '',
    },
    {
        id: 5,
        name: 'close grip curl and wide grip curl',
        muscleTypes: 'biceps',
        image: '',
    },
    {
        id: 6,
        name: 'leg press',
        muscleTypes: 'quads',
        image: '',
    },
    {
        id: 7,
        name: 'walking lunges with barbell',
        muscleTypes: 'quads, glutes, hamstrings',
        image: '',
    },
    {
        id: 8,
        name: 'leg extension',
        muscleTypes: 'quadriceps',
        image: '',
    },
    {
        id: 9,
        name: 'back leg curl',
        muscleTypes: 'hamstrings',
        image: '',
    },
    {
        id: 10,
        name: 'calf press',
        muscleTypes: 'calves',
        image: '',
    },
    {
        id: 11,
        name: 'shoulder push ups',
        muscleTypes: 'shoulders',
        image: '',
    },
    {
        id: 12,
        name: 'dumbbell shoulder front raise',
        muscleTypes: 'front delts',
        image: '',
    },
    {
        id: 13,
        name: 'chest push ups',
        muscleTypes: 'chest',
        image: '',
    },
    {
        id: 14,
        name: 'incline dumbbell press',
        muscleTypes: 'chest',
        image: '',
    },
    {
        id: 15,
        name: 'incline dumbbell fly',
        muscleTypes: 'chest',
        image: '',
    },
    {
        id: 16,
        name: 'dumbbell shoulder press',
        muscleTypes: 'middle delts',
        image: '',
    },
    {
        id: 17,
        name: 'dumbbell shoulder fly',
        muscleTypes: 'middle delts',
        image: '',
    },
    {
        id: 18,
        name: 'rope push-down triceps',
        muscleTypes: 'triceps',
        image: '',
    },
    {
        id: 19,
        name: 'parallel bar dips',
        muscleTypes: 'triceps',
        image: '',
    }
]
