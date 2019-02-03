import {Reducer} from 'redux'
import * as lodash from 'lodash'
import * as randomstring from 'randomstring'
import {DirectState, defaultState, Card} from './model'
import {Action} from './actions'
import {CardFeature, CardColor, CardNumber, sameFeatureGroup} from './common'
import {pluckaroo} from './utils'
import { wrapReducerWithUndo } from './undo';
import persist from './persist';

const reducer1: Reducer<DirectState, Action> = (state, action) => {
    console.log("action", action.type, action)
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
            const hints = lodash.mapValues(state.hints, (v, k) =>
                                        ((k == action.feature) && gate)) as {[q in CardFeature]: boolean}
            state = {...state, hints}
            return hintScan(state)
        case "discard": {
            let cards = discardOneSelected(state.cards)
            cards.push(newCard())
            return {...state, cards}
        }
        case "transitionEnd": {
            let cards: Card[] = lodash.flatMap(state.cards, (card) => {
                if (card.id == action.cardID && card.phase == action.phase) {
                    return nextPhase(card)
                }
                    if (action.phase == 'flewup' && card.phase == 'arrive') {
                         // Any card reaching the sky starts the expansion of arrivals.
                         return [{...card, phase: 'stable' as 'stable'}]
                    }
                return [card]
            })
            return {...state, cards}
        }
        case "reset":
            return defaultState
        case "undo":
            // An undo just happened so clean up by deselecting everything.
            const cards = state.cards.map((c) => ({...c, selected: false}))
            return {...state, cards}
        default:
            return state
    }
}

const reducer2 = wrapReducerWithUndo(reducer1, {
    limit: 10,
    undoAction: "undo",
    filter: (action: Action) => {
        switch (action.type) {
        case "tapHint":
        case "discard":
        case "reset":
            return true
        }
        return false
    }
})
const persistOut = persist(reducer2, {
    key: 'rootState',
    schemaVersion: 1,
})
const {reducer, restoreState} = persistOut

export {reducer}
export {restoreState}

function newCard(): Card {
    return {...defaultState.cards[0],
        id: randomstring.generate(),
        phase: 'arrive',
    }
}

function discardOneSelected(cards: Card[]): Card[] {
    return cards.map((card) => {
        if (card.selected) {
            return {...card,
                selected: false,
                phase: 'flewup' as 'flewup'
            }
        }
        return card
    })
}

function nextPhase(card: Card): Card[] {
    switch (card.phase) {
    case 'arrive':
        return [card] // not advance here
     case 'flewup':
        return [{...card, phase: 'gone'}]
    case 'gone':
        return [] // remove from tree
    default:
        return [card]
    }
}

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
