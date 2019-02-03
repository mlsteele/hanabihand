import {Reducer, Action} from 'redux'

export interface Options {
    key: string
    schemaVersion: number
}

export interface Output<S, A extends Action> {
    reducer: Reducer<S,A>,
    restoreState: () => S | undefined,
}

// Save state to local storage after every state transitio.
export default function persist
    <S, A extends Action>
(reducer: Reducer<S,A>, opts: Options): Output<S,A> {
    return {
        reducer: (state: S | undefined, action: A): S => {
            state = reducer(state, action)
            saveState(state, opts)
            return state
        },
        restoreState: () => restoreState<S>(opts)
    }
}

function restoreState<S>(opts: Options): S | undefined {
    try {
        const serialized = localStorage.getItem(opts.key)
        if (serialized === null) {
            return undefined
        }
        const obj = JSON.parse(serialized)
        if (obj.schemaVersion !== opts.schemaVersion) {
            console.log("discarding loaded state with mismatched version",
                        obj.schemaVersion, opts.schemaVersion)
            return undefined
        }
        return obj.data
    } catch (err) {
        console.log("error fetching state", err)
        return undefined
    }
}

function saveState(state: any, opts: Options) {
    try {
        localStorage.setItem(opts.key, JSON.stringify({
            schemaVersion: opts.schemaVersion,
            data: state,
        }))
    } catch (err) {
        console.log("error persisting state", err)
    }
}
