export const getPresetTimers = () => {
    return new Promise(resolve =>
        setTimeout(() => resolve(
            [
                {
                    name: "Teste",
                    type: "WorkRest",
                    timer: {
                        workTime: 10,
                        restTime: 5,
                        workNames: [
                        'Round 1',
                        'Round 2',
                        'Round 3'
                        ],
                        restNames: [
                        'Rest 1',
                        'Rest 2'
                        ]
                    }
                },
                {
                    name: "Tabata",
                    type: "WorkRest",
                    timer: {
                        workTime: 20,
                        restTime: 10,
                        workNames: [
                        'Round 1',
                        'Round 2',
                        'Round 3',
                        'Round 4',
                        'Round 5',
                        'Round 6',
                        'Round 7',
                        'Round 8'
                        ],
                        restNames: [
                        'Rest 1',
                        'Rest 2',
                        'Rest 3',
                        'Rest 4',
                        'Rest 5',
                        'Rest 6',
                        'Rest 7'
                        ]
                    }
                },
                {
                    name: "Pomodoro",
                    type: "WorkRest",
                    timer: {
                        workTime: 1500,
                        restTime: 300,
                        workNames: [
                        'Round 1',
                        'Round 2',
                        'Round 3',
                        'Round 4'
                        ],
                        restNames: [
                        'Rest 1',
                        'Rest 2',
                        'Rest 3'
                        ]
                    }
                }
            ]
        ),
        Math.random() * 5000
    )
)}