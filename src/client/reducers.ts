import {Reducer} from 'redux'
import {State, defaultState} from './model'

const reducer: Reducer<State> = (state, action) => {
    switch (action.type) {
        default:
            if (state === undefined) {
                return defaultState
            }
            return state
    }
}

export default reducer