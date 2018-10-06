import {Reducer} from 'redux'
import * as lodash from 'lodash'
import {DirectState, defaultState, Card} from './model'
import {Action} from './actions'
import {CardFeature, CardColor, CardNumber, sameFeatureGroup} from './common'
import {pluckaroo} from './utils'
import { wrapReducerWithUndo } from './undo';

const reducer: Reducer<DirectState, Action> = (state, action) => {
    console.log("action", action.type)
    if (state === undefined) {
        state = defaultState
    }
    switch (action.type) {
        case "tapCard":
            state = {...state, cards: pluckaroo(state.cards, action.i, (x) => ({...x, selected: !x.selected}))}
            return hintScan(state)
        case "tapHint":
            // Zero or one hint features can be selected at a time.
            const gate = !state.hints[action.feature]
            const hints = lodash.mapValues(state.hints, (v, k) => ((k == action.feature) && gate)) as {[q in CardFeature]: boolean}
            state = {...state, hints}
            return hintScan(state)
        case "discard":
            let cards: Card[] = state.cards.map<Card>(lodash.identity)
            cards.splice(action.i, 1)
            cards.push(defaultState.cards[0])
            return {...state, cards}
        case "reset":
            return defaultState
        default:
            return state
    }
}

export default wrapReducerWithUndo(reducer, {
    limit: 10,
    undoAction: "undo",
})

// If a hint and card(s) are selected, commit the hint.
function hintScan(state: DirectState): DirectState {
    const selectedHint: CardFeature | null = getSelectedHint(state)
    const cardsSelected: boolean = state.cards.findIndex((card) => card.selected) != -1;
    if (cardsSelected && selectedHint !== null) {
        return commitHint(state, selectedHint)
    }
    return state
}

function getSelectedHint(state: DirectState): (CardFeature | null) {
    const x = lodash.chain(state.hints).toPairs().find((pair) => pair[1]).value()
    if (x) {
        return x[0] as CardFeature
    }
    return null
}

// Record all the information from the hint and reset selection.
function commitHint(state: DirectState, hint: CardFeature): DirectState {
    function possible(selected: boolean, key: CardFeature, prev: boolean): boolean {
        if (key == hint) {
            return selected
        }
        if (selected && sameFeatureGroup(key, hint)) {
            return false
        }
        return prev
    }
    return {...state,
        cards: state.cards.map((card) => ({...card,
            selected: false,
            colors: lodash.mapValues(card.colors,   (v, k) =>
                possible(card.selected, k as CardFeature, v)) as {[q in CardColor]: boolean},
            numbers: lodash.mapValues(card.numbers, (v, k) =>
                possible(card.selected, k as CardFeature, v)) as {[q in CardNumber]: boolean},
        })),
        hints: defaultState.hints,
    }
}