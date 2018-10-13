import * as React from 'react';
import { connect } from 'react-redux'
import { allColors, allNumbers } from './common';
import {State} from './model';
import Card from './card';
import Tray from './tray';
import Reset from './reset';
import Undo from './undobutton';

type StateProps = {
    state: State
}

type Props = StateProps

class App extends React.Component<Props> {
    render() {
        const cards = this.props.state.live.cards.map((card, i) => {
            return <Card key={card.id} i={i}/>
        })
        const flexy = {
            display: 'flex',
            flexDirection: 'row' as 'row',
            justifyContent: 'space-around',
            alignContent: 'stretch',
        }
        return <div>
            <div style={flexy}>
                {cards}
            </div>
            <div style={flexy}>
                <Undo />
                <Reset />
            </div>
            <Tray />
        </div>
    }
}

export default connect<StateProps, {}, {}>(
    (state: State) => {
        return {state}
    }
)(App)
