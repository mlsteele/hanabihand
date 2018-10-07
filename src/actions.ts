import {CardFeature} from './common'

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

export const discard = (i: number): {
    type: "discard"
    i: number,
} => ({
    type: "discard",
    i,
})

export const upkeep = (): {
    type: "upkeep"
} => ({
    type: "upkeep",
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

export type Action = ReturnType<typeof tapCard> | ReturnType<typeof tapHint> | ReturnType<typeof discard> | ReturnType<typeof upkeep> | ReturnType<typeof reset> | ReturnType<typeof undo>
