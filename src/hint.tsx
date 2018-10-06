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
        const size = "40px"
        const style = {
            // width: 80,
            height: size,
            margin: 5,
            flexGrow: 1,
            flexBasis: 1,
            borderRadius: size,
            transform: "",
            transition: "all 0.15s",
            verticalAlign: 'middle',
            backgroundColor: "#333",
            color: "white",
            border: "1px solid #222",
            boxShadow: "",
            fontSize: "24px",
            textAlign: 'center' as 'center',
            lineHeight: size,
            "WebkitTapHighlightColor": "transparent",
        }
        if (this.props.selected) {
            style.transform = "scale(1.05)"
            style.boxShadow = "0px 0px 5px 0px #222"
        }
        if (isColor(this.props.feature)) {
            const color = colorHex[this.props.feature as CardColor]
            style.backgroundColor = color
            style.color = shadeColor2(color, 0.5)
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

// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor2(color: string, percent: number): string {   
    var f =parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
