import * as React from 'react';
import Card from './card';

export default class App extends React.Component {
    render() {
        const cards = [0, 1, 2, 3, 4, 5].map((i) => {
            <Card i={i}/>
        })
        return cards
    }
}
