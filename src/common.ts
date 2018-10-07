export type CardColor = "white" | "yellow" | "green" | "blue" | "red"

export var allColors: CardColor[] = ["white", "yellow", "green", "blue", "red"]

export type CardNumber = 1 | 2 | 3 | 4 | 5

export var allNumbers: CardNumber[] = [1, 2, 3, 4, 5]

export type CardFeature = CardColor | CardNumber

export var colorHex = {
    white: "#f6fbfa",
    yellow: "#fcec41",
    green: "#1aaf3f",
    blue: "#23c3e6",
    red: "#e41253",
}

export function isColor(x: CardFeature): boolean {
    // Cast in order to run indexOf even though the casts are inaccurate.
    return allColors.indexOf(x as CardColor) != -1
}

export function sameFeatureGroup(a: CardFeature, b: CardFeature): boolean {
    return isColor(a) == isColor(b)
}

// export const transitionTime = "2s"
// export const transitionTime = "1s"
export const transitionTime = "0.3s"
// export const transitionTime = "0.15s"
