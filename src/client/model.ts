import {CardColor, CardNumber, allColors} from './common'

export interface Card {
    colors: {[q in CardColor]: boolean}
    numbers: {[q in CardNumber]: boolean}
}

export type State = {
    Cards: Card[]
}

export const defaultState: State = {
    Cards: [0, 1, 2, 3, 4].map((): Card => {
        return {
            colors: {
                "white": true,
                "yellow": true,
                "green": true,
                "blue": true,
                "red": true,
            },
            numbers: {
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
            },
        }
    })
}