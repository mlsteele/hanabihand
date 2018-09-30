import {Reducer} from 'redux'
import {State, defaultState} from './model'
import {Action} from './actions'

function pluckaroo<Y> (list: Y[], i: number, f: (x: Y) => Y): Y[] {
    return list.map((x, j) => {
        return i == j ? f(x) : x;
    })
}

const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case "tapCard":
            return {...state, cards: pluckaroo(state.cards, action.i, (x) => ({...x, selected: !x.selected}))}
        default:
            if (state === undefined) {
                return defaultState
            }
            return state
    }
}

export default reducer