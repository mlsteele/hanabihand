import {CardFeature} from './common'
import {CardPhase} from './model'

export const tapCard = (i: number): {
    type: "tapCard"
    i: number,
} => ({
    type: "tapCard",
    i,
})

export const tapHint = (feature: CardFeature): {
    type: "tapHint"
    feature: CardFeature,
} => ({
    type: "tapHint",
    feature,
})

export const discard = (): {
    type: "discard"
} => ({
    type: "discard",
})

export const transitionEnd = (cardID: string, phase: CardPhase): {
    type: "transitionEnd"
    cardID: string,
    phase: CardPhase,
} => ({
    type: "transitionEnd",
    cardID,
    phase,
})

export const reset = (): {
    type: "reset"
} => ({
    type: "reset",
})

export const undo = (): {
    type: "undo"
} => ({
    type: "undo",
})

export type Action = ReturnType<typeof tapCard> | ReturnType<typeof tapHint> | ReturnType<typeof discard> | ReturnType<typeof transitionEnd> | ReturnType<typeof reset> | ReturnType<typeof undo>
