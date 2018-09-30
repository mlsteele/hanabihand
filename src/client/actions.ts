export const tapCard = (i: number): {
    type: "tapCard"
    i: number,
} => ({
    type: "tapCard",
    i,
})

export const noOp = (i: number): {
    type: "noOp",
} => ({
    type: "noOp",
})

export type Action = ReturnType<typeof tapCard> | ReturnType<typeof noOp>
