import {Reducer, Action} from 'redux'

// State with memory for undo-ing
export interface State<S> {
    live: S
    past: S[]
}

export interface Options<T, A extends Action<T>> {
    limit: number
    undoAction: T
    // Select actions that are undoable.
    // State is saved right before undoable actions.
    // If not specified, every action is undoable.
    filter?: (action: A) => boolean
}

// Take a reducer and return an undo-aware reducer.
// The returned reducer handles undo actions.
export function wrapReducerWithUndo
    <S, T, A extends Action<T>>
(reducer: Reducer<S,A>, opts: Options<T, A>): Reducer<State<S>,A> {
    const filter = opts.filter || ((action: A) => true)
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
                if (filter(action)) {
                    past.push(state.live)
                    if (past.length > opts.limit) {
                        past.shift()
                    }
                }
                return {
                    live: reducer(state.live, action),
                    past,
                }
            }
        }
    }
}
