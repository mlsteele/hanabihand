import * as React from 'react';
import { connect } from 'react-redux'
import {CardFeature} from './common'
import {State} from './model'
import * as actions from './actions'

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
        let backgroundColor;
        if (this.props.selected) {
            backgroundColor = 'green'
        }
        return <div onClick={this.props.onTap} style={{backgroundColor}}>
            {this.props.feature}
        </div>
    }
}

export default connect<StateProps, DispatchProps, {
    feature: CardFeature
}>(
    (state: State, ownProps) => {
        return {
            selected: state.hints[ownProps.feature],
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