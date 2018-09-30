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

export const reset = (): {
    type: "reset"
} => ({
    type: "reset",
})

export type Action = ReturnType<typeof tapCard> | ReturnType<typeof tapHint> | ReturnType<typeof reset>
