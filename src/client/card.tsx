import * as React from 'react';
import {CardColor, CardNumber, allColors, allNumbers} from './common'
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
}

type Props = StateProps & DispatchProps

export class Card extends React.Component<Props> {
    render() {
        const colorSlots = allColors.map((color) => {
            return <ColorSlot key={color} color={color} live={this.props.colors[color]}/>
        })
        const numberSlots = allNumbers.map((n) => {
            return <NumberSlot key={n} n={n} live={this.props.numbers[n]}/>
        })
        let backgroundColor;
        if (this.props.selected) {
            backgroundColor = 'green'
        }
        return <div onClick={this.props.onTap} style={{backgroundColor}}>
            {colorSlots}
            {numberSlots}
        </div>
    }
}

export default connect<StateProps, DispatchProps, {
    i: number
}>(
    (state: State, ownProps) => {
        return state.cards[ownProps.i]
    },
    (dispatch, ownProps) => {
        return {
            onTap: () => {
                dispatch(actions.tapCard(ownProps.i))
            }
        }
    }
)(Card)

class ColorSlot extends React.Component<{color: CardColor, live: boolean}> {
    render() {
        const d = this.props.live ? "y" : "n";
        return <div>{this.props.color} {d}</div>
    }
}

class NumberSlot extends React.Component<{n: CardNumber, live: boolean}> {
    render() {
        const d = this.props.live ? "y" : "n";
        return <div>{this.props.n} {d}</div>
    }
}
