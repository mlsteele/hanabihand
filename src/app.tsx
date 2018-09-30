import * as React from 'react';
import { allColors, allNumbers } from './common';
import Card from './card';
import Hint from './hint';
import Reset from './reset';
import Undo from './undobutton';

export default class App extends React.Component {
    render() {
        const colorFeatures = allColors.map((c) => {
            return <Hint key={c} feature={c}/>
        })
        const numberFeatures = allNumbers.map((n) => {
            return <Hint key={n} feature={n}/>
        })
        const cards = [0, 1, 2, 3, 4].map((i) => {
            return <Card key={i} i={i}/>
        })
        return <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                {colorFeatures}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                {numberFeatures}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                {cards}
            </div>
            <Reset/>
            <Undo/>
        </div>
    }
}