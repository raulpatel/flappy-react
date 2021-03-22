import React, { Component } from 'react';

class Game extends Component {
    state = {
        bird: {
            x: 50,
            y: this.refs.canvas.height / 2,
            radius: 20
        }
    }
    draw = () => {
        const ctx = this.refs.canvas.getContext("2d");
        // change this color to change the color of the pen in canvas
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.state.bird.x, this.state.bird.y, this.state.bird.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    componentDidMount() {
        this.draw()
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={450} height={650} />
            </div>
        );
    }
}

export default Game;