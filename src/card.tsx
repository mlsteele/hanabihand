import * as React from 'react';
import {CardColor, CardNumber, allColors, allNumbers, CardFeature} from './common'
import { connect } from 'react-redux'
import {State} from './model'
import { debug } from 'util';
import * as actions from './actions'

type StateProps = {
    selected: boolean,
    colors: {[q in CardColor]: boolean}
    numbers: {[q in CardNumber]: boolean}
}

type DispatchProps = {
    onTap: () => void
    onDiscard: () => void
}

type Props = StateProps & DispatchProps

export class Card extends React.Component<Props> {
    render() {
        const colorSlots = allColors.map((color) => {
            return <ColorSlot key={color} color={color} possible={this.props.colors[color]}/>
        })
        const numberSlots = allNumbers.map((n) => {
            return <NumberSlot key={n} n={n} possible={this.props.numbers[n]}/>
        })
        let style = {
            margin: 10,
            padding: 20,
            backgroundColor: "#cce",
            transition: "all 0.15s",
            transform: "",
            boxShadow: "",
            "-webkit-tap-highlight-color": "transparent",
        }
        if (this.props.selected) {
            style.transform = "scale(1.05)"
            style.boxShadow = "0px 0px 20px 5px #8dc"
        }
        return <div onClick={this.props.onTap} style={style}>
            {colorSlots}
            {numberSlots}
            <button onClick={wsp(this.props.onDiscard)}>Discard</button>
        </div>
    }
}

// Wrap with stopPropagation.
function wsp(f: () => void): (e: any) => void {
    return (e: any) => {
        console.log("prevent default")
        e.stopPropagation()
        return f()
    }
}

export default connect<StateProps, DispatchProps, {
    i: number
}>(
    (state: State, ownProps) => {
        return state.live.cards[ownProps.i]
    },
    (dispatch, ownProps) => {
        return {
            onTap: () => dispatch(actions.tapCard(ownProps.i)),
            onDiscard: () => dispatch(actions.discard(ownProps.i)),
        }
    }
)(Card)

class ColorSlot extends React.Component<{color: CardColor, possible: boolean}> {
    render() {
        let size = 25;
        let style = {
            margin: 5,
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: this.props.color as string,
            transition: "all 0.15s",
            transform: "",
        }
        if (!this.props.possible) {
            style.backgroundColor = "grey"
            style.transform = "scale(0.5)"
        }
        return <div style={style}></div>
    }
}

class NumberSlot extends React.Component<{n: CardNumber, possible: boolean}> {
    render() {
        return <Slot feature={this.props.n} isColor={false} possible={this.props.possible}/>
    }
}

class Slot extends React.Component<{feature: CardFeature, isColor: boolean, possible: boolean}> {
    render() {
        let style = {}
        if (!this.props.possible) {
            style = {
                color: 'grey',
                textDecoration: 'line-through',
            }
        }
        return <div style={style}>{this.props.feature}</div>
    }
}