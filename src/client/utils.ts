export function pluckaroo<Y> (list: Y[], i: number, f: (x: Y) => Y): Y[] {
    return list.map((x, j) => {
        return i == j ? f(x) : x;
    })
}
