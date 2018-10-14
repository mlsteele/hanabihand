import * as randomstring from 'randomstring'
import {CardColor, CardNumber, CardFeature} from './common'
import * as undo from './undo'

export type CardPhase =
     | 'arrive' // new card invisible, zero width
     | 'stable' // stable state
     | 'flewup' // up in the air
     | 'gone'   // slot vacated, zero width

export interface Card {
    id: string
    selected: boolean,
    colors: {[q in CardColor]: boolean}
    numbers: {[q in CardNumber]: boolean}
     phase: CardPhase
}

// State with undo-ability.
export type DirectState = {
    cards: Card[]
    hints: {[q in CardFeature]: boolean}
}

export type State = undo.State<DirectState>

export const defaultState: DirectState = {
    cards: [0, 1, 2, 3, 4].map((i): Card => {
        return {
            id: randomstring.generate(),
            // selected: i == 1,
            selected: false,
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
               phase: 'stable',
        }
    }),
    hints: {
        "white": false,
        "yellow": false,
        "green": false,
        "blue": false,
        "red": false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    },
}
