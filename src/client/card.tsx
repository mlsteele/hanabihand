import * as React from 'react';
import {CardColor, CardNumber, allColors, allNumbers} from './common'
import { connect } from 'react-redux'
import {State} from './model'
import { debug } from 'util';

type Props = {
    colors: {[q in CardColor]: boolean}
    numbers: {[q in CardNumber]: boolean}
}

export class Card extends React.Component<Props> {
    render() {
        const colorSlots = allColors.map((color) => {
            return <ColorSlot color={color} live={this.props.colors[color]}/>
        })
        const numberSlots = allNumbers.map((n) => {
            return <NumberSlot n={n} live={this.props.numbers[n]}/>
        })
        return <div>
            {colorSlots}
            {numberSlots}
        </div>
    }
}

export default connect((state: State, ownProps: {
    i: number
}): Props => {
    return {
        colors: state.Cards[ownProps.i].colors,
        numbers: state.Cards[ownProps.i].numbers,
    }
})(Card)

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
