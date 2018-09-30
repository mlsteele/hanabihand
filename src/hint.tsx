import * as React from 'react';
import { connect } from 'react-redux'
import {CardFeature} from './common'
import {State} from './model'
import * as actions from './actions'
import * as CSS from 'csstype';

type StateProps = {
    selected: boolean,
    feature: CardFeature
}

type DispatchProps = {
    onTap: () => void
}

type Props = StateProps & DispatchProps

export class Hint extends React.Component<Props> {
    render() {
        let backgroundColor = '#ddf'
        if (this.props.selected) {
            backgroundColor = 'green'
        }
        const size = "70px"
        const style = {
            backgroundColor,
            width: size,
            height: size,
            borderRadius: size,
            lineHeight: size,
            textAlign: 'center' as CSS.TextAlignProperty, // why is this cast necessary?
            verticalAlign: 'middle',
        }
        return <div onClick={this.props.onTap} style={style}>
            {this.props.feature}
        </div>
    }
}

export default connect<StateProps, DispatchProps, {
    feature: CardFeature
}>(
    (state: State, ownProps) => {
        return {
            selected: state.live.hints[ownProps.feature],
            feature: ownProps.feature,
        }
    },
    (dispatch, ownProps) => {
        return {
            onTap: () => {
                dispatch(actions.tapHint(ownProps.feature))
            }
        }
    }
)(Hint)