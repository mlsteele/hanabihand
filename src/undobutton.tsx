import * as React from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'

type Props = {
    onTap: () => void
}

class Undo extends React.Component<Props> {
    render() {
        const size = "40px"
        const style = {
            height: size,
            textAlign: 'center' as 'center',
            lineHeight: size,
        };
        return <div onClick={this.props.onTap} style={style} >
            ⟲ Undo
        </div>
    }
}

export default connect<{}, {onTap: () => void}, {}>(
    () => ({}),
    (dispatch) => {
        return {
            onTap: () => {
                dispatch(actions.upkeep())
            }
        }
    }
)(Undo)
