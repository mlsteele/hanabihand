import * as React from 'react';
import { connect } from 'react-redux'
import {CardFeature, isColor, colorHex, CardColor} from './common'
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
        const size = "70px"
        const style = {
            backgroundColor: "#ddf",
            width: size,
            height: size,
            borderRadius: size,
            lineHeight: size,
            textAlign: 'center' as CSS.TextAlignProperty, // why is this cast necessary?
            verticalAlign: 'middle',
            transition: "all 0.15s",
            transform: "",
            boxShadow: "",
            "WebkitTapHighlightColor": "transparent",
        }
        if (this.props.selected) {
            style.transform = "scale(1.05)"
            style.boxShadow = "0px 0px 20px 5px #fb9"
        }
        if (isColor(this.props.feature)) {
            style.backgroundColor = colorHex[this.props.feature as CardColor]
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
