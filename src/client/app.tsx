import * as React from 'react';
import Card from './card';

export default class App extends React.Component {
    render() {
        const cards = [0, 1, 2, 3, 4].map((i) => {
            return <Card key={i} i={i}/>
        })
        return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            {cards}
        </div>
    }
}
