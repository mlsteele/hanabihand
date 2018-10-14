import * as React from 'react';

interface Props {
    enabled: boolean
    onTap: () => void
}

export default class Discard extends React.Component<Props> {
    render() {
        const style = {
            color: '#333',
            margin: '0 6px',
            padding: '0 10px',
            fontSize: "24px",
            backgroundColor: 'white',
            borderRadius: 6,
            border: "1px solid #222",
        }
        if (!this.props.enabled) {
            style.color = '#ccc'
        }
        return <button
            style={style}
            onClick={this.props.onTap}
            disabled={!this.props.enabled}
            >Discard</button>
    }
}
