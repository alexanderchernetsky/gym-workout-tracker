import {Exercise, exercises} from "./exercises";

export interface Workout {
    id: number,
    name: string,
    muscleTypes: string,
    exercises: Exercise[]
}

export const workouts: Workout[] = [
    {
        id: 1,
        name: 'Three day split. Workout A',
        muscleTypes: 'back, rear delts, biceps',
        exercises: [
            exercises[0],
            exercises[1],
            exercises[2],
            exercises[3],
            exercises[4]
        ],
    },
    {
        id: 2,
        name: 'Three day split. Workout B',
        muscleTypes: 'legs, front delts',
        exercises: [
            exercises[5],
            exercises[6],
            exercises[7],
            exercises[8],
            exercises[9],
            exercises[10],
            exercises[11],
        ]
    },
    {
        id: 3,
        name: 'Three day split. Workout C',
        muscleTypes: 'chest, middle delt, triceps',
        exercises: [
            exercises[12],
            exercises[13],
            exercises[14],
            exercises[15],
            exercises[16],
            exercises[17],
            exercises[18]
        ]
    }
]
