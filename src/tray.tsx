import * as React from 'react';
import * as lodash from 'lodash'
import {CardColor, CardNumber, allColors, allNumbers, CardFeature, colorHex, transitionTime} from './common'
import { connect } from 'react-redux'
import {State, CardPhase} from './model'
import { debug } from 'util';
import * as actions from './actions'
import Hint from './hint';
import Discard from './discardbutton';

type StateProps = {
    show: boolean,
    showDiscard: boolean
}

type DispatchProps = {
    onDiscard: () => void
    onHint: (feature: CardFeature) => void
}

type Props = StateProps & DispatchProps

export class Tray extends React.Component<Props> {
    render() {
        const colorFeatures = allColors.map((c) => {
            return <Hint key={c} feature={c}/>
        })
        const numberFeatures = allNumbers.map((n) => {
            return <Hint key={n} feature={n}/>
        })
        const style = {
            position: "fixed" as "fixed",
            width: "100%",
            height: "200px",
            bottom: 0,
            overflow: "hidden",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px 0px #0008",
            transition: `all 0.22s cubic-bezier(0,1.03,0,1.02)`,
        }
        if (!this.props.show) {
            style.height = "0"
            style.padding = 0
            style.transition = `all 0.22s cubic-bezier(0,-0.01,.81,-0.03)`
        }
        const flexy = {
            display: 'flex',
            justifyContent: 'space-around',
            alignContent: 'stretch',
        }
        return <div style={style}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: 20,
            }}>
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                    <div style={{...flexy, marginBottom: 10}}>{colorFeatures}</div>
                    <div style={flexy}>{numberFeatures}</div>
                </div>
                <Discard enabled={this.props.showDiscard} onTap={this.props.onDiscard} />
            </div>
        </div>
    }
}

export default connect<StateProps, DispatchProps, {}>(
    (state: State, ownProps) => {
        const nselected = state.live.cards.filter(({selected}) => selected).length
        return {
            show: nselected > 0,
            showDiscard: nselected <= 1,
        }
    },
    (dispatch, ownProps) => ({
        onDiscard: () => dispatch(actions.discard()),
        onHint: (feature: CardFeature) => dispatch(actions.tapHint(feature)),
    })
)(Tray)
