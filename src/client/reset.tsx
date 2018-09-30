import * as React from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'

type Props = {
    onTap: () => void
}

class Reset extends React.Component<Props> {
    render() {
        return <div onClick={this.props.onTap} >
            Reset
        </div>
    }
}

export default connect<{}, {onTap: () => void}, {}>(
    () => ({}),
    (dispatch) => {
        return {
            onTap: () => {
                dispatch(actions.reset())
            }
        }
    }
)(Reset)