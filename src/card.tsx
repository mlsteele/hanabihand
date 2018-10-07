import * as React from 'react';
import * as lodash from 'lodash'
import {CardColor, CardNumber, allColors, allNumbers, CardFeature, colorHex, transitionTime} from './common'
import { connect } from 'react-redux'
import {State, CardPhase} from './model'
import { debug } from 'util';
import * as actions from './actions'

type StateProps = {
    id: string
    selected: boolean,
    colors: {[q in CardColor]: boolean}
    numbers: {[q in CardNumber]: boolean}
    phase: CardPhase
}

type DispatchProps = {
    onTap: () => void
    onDiscard: () => void
    onTransitionEnd: (cardID: string, phase: CardPhase) => void
}

type Props = StateProps & DispatchProps

export class Card extends React.Component<Props> {
    render() {
        const onTransitionEnd = lodash.once(() => {
            this.props.onTransitionEnd(this.props.id, this.props.phase)
        })
        const colorSlots = allColors.map((color) => {
            return <ColorSlot key={color} color={color} possible={this.props.colors[color]}/>
        })
        const numberSlots = allNumbers.map((n) => {
            return <NumberSlot key={n} n={n} possible={this.props.numbers[n]}/>
        })
		let styleSquisher = {
			flex: "1 1 1px",
            transition: `all ${transitionTime}`,
            overflow: "hidden",
		}
        let style = {
            margin: "0 auto",
			width: 100,
            padding: 20,
            borderRadius: 5,
            backgroundColor: "#333",
            border: "1px solid #222",
            transition: `all ${transitionTime}`,
            transform: "",
            boxShadow: "",
            "WebkitTapHighlightColor": "transparent",
        }
        const sc = this.sureColor()
        if (sc !== null) {
            style.backgroundColor = colorHex[sc]
        }
        if (this.props.selected) {
            style.transform = "scale(1.01)"
            style.boxShadow = "0px 0px 20px 5px #222"
		}
        let showCard = true
        switch (this.props.phase) {
        case 'flewup':
            style.transform = "translate(0, -300px)"
            break
        case 'arrive':
			styleSquisher.flex = "0 1 0px"
            setTimeout(onTransitionEnd)
        case 'gone':
			styleSquisher.flex = "0 1 0px"
            showCard = false
        }
        return <div data-note="squisher" data-phase={this.props.phase} style={styleSquisher}
                    onTransitionEnd={onTransitionEnd} >
			{showCard && <div data-note="card" onClick={this.props.onTap} style={style}
                 onTransitionEnd={onTransitionEnd} >
				<div style={{
					display: 'flex',
				}}>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
					}}>
						{numberSlots}
					</div>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
					}}>
						{colorSlots}
					</div>
				</div>
				<button onClick={wsp(this.props.onDiscard)}>Discard</button>
			</div>}
		</div>
    }

    sureColor(): CardColor | null {
        const colors = lodash.chain(this.props.colors).toPairs().filter((pair) => pair[1]).map((pair) => pair[0]).value()
        if (colors.length == 1) {
            return colors[0] as CardColor
        }
        return null
    }
}

// Wrap with stopPropagation.
function wsp(f: () => void): (e: any) => void {
    return (e: any) => {
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
            onTransitionEnd: (cardID, phase) => dispatch(actions.transitionEnd(cardID, phase)),
        }
    }
)(Card)

class ColorSlot extends React.Component<{color: CardColor, possible: boolean}> {
    render() {
        let size = 25;
        let style = {
            margin: "3px 5px",
            width: size,
            height: size,
            borderRadius: size,
            border: "1px solid #222",
            backgroundColor: colorHex[this.props.color],
            transition: `all ${transitionTime}`,
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
        let style = {
            color: 'white',
            fontSize: "30px",
            textDecoration: "",
        }
        if (!this.props.possible) {
            style.color = 'grey'
            style.textDecoration = 'line-through'
        }
        return <div style={style}>{this.props.n}</div>
    }
}
