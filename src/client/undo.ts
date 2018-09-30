import {Reducer, Action} from 'redux'

export interface State<S> {
    live: S
    past: S[]
}

export interface Options<T> {
    limit: number
    undoAction: T
}

export function wrapReducerWithUndo<S, T, A extends Action<T>>(reducer: Reducer<S,A>, opts: Options<T>): Reducer<State<S>,A> {
    return (state: State<S> | undefined, action: A): State<S> => {
        if (state === undefined) {
            return {
                live: reducer(state, action),
                past: [],
            }
        }
        switch (action.type) {
            case opts.undoAction: {
                if (state.past.length == 0) {
                    // No history, pass through.
                    return {...state,
                        live: reducer(state.live, action)}
                }
                let past = [...state.past]
                const prev = past.pop()
                return {
                    // Pass the undo through.
                    live: reducer(prev, action),
                    past: past,
                }
            }
            default: {
                let past = [...state.past]
                if (state.live !== undefined) {
                    past.push(state.live)
                }
                if (past.length > opts.limit) {
                    past.shift()
                }
                return {
                    live: reducer(state.live, action),
                    past,
                }
            }
        }
    }
}