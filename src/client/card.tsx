import * as React from 'react';
import {CardColor, CardNumber, allColors, allNumbers} from './common'

interface Props {
    colors: {[q in CardColor]: boolean}
    numbers: {[q in CardNumber]: boolean}
}

export default class Card extends React.Component<Props> {
    render() {
        const colorSlots = allColors.map((color) => {
            <ColorSlot color={color} live={this.props.colors[color]}/>
        })
        return <div>
            {colorSlots}
        </div>
    }
}

class ColorSlot extends React.Component<{color: CardColor, live: boolean}> {
    render() {
        return <div>{this.props.color} {this.props.live}</div>
    }
}
