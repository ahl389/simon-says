import React, { Component } from 'react';
import Level from './Level.js';
import Timer from './Timer.js';
import levels from './levels.js'
import './App.css';

class App extends Component {
    constructor(props) {
		super(props);
        
		this.state = {
			lives: 3,
			hideGame: true,
            level: 0,
            colors: ['#e6194B', '#f58231', '#ffe119', '#3cb44b', '#4363d8', '#911eb4'],
            buttonText: 'Begin',
            statusCode: 1
		};
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    updateGameStatus(gameStatus) {
        if (gameStatus === 'NEW_GAME') {
            this.setState({
                hideGame: true,
                buttonText: 'Play Again?',
                lives: 3,
                level: 0
            });
        } else if (gameStatus === 'NEXT_LEVEL') {
            this.setState({
                hideGame: true,
                buttonText: 'next level',
                lives: 3,
                level: this.state.level + 1
            });
        }
    }
    
    handleClick() {
        this.setState({
            hideGame: false
        });
    }
    
    removeLife() {
        const lives = this.state.lives - 1;
        
        if (lives > 0) {
            this.setState({
                lives: lives
            });
        } else {
            this.updateGameStatus('NEW_GAME');
        }
    }
    
    increaseLevel(){
        this.updateGameStatus('NEXT_LEVEL');
    }
    
    render() {
        const removeLife = this.removeLife;
        const increaseLevel = this.increaseLevel;
        const livesDisplay = this.state.lives > 1 ? `${this.state.lives} lives remaining` : `${this.state.lives} life remaining`
        const levelDisplay = `Level ${this.state.level + 1} `
        

        return (
            <div className = "game">
                { this.state.hideGame 
                  ?	<button
                		className="button"
                		onClick={this.handleClick}>
                        { this.state.buttonText }
                 	</button>
                
            	  : <div className = "play-area">
                        <div className = "game-state">
                            <div className = "level-display">{ levelDisplay }</div>
                            <div className = "lives-display">{ livesDisplay }</div>
                        </div>
                        
                        <Level 
                		id={this.state.level}
                		tileCount={levels[this.state.level].tileCount}
                        patternLength={levels[this.state.level].patternLength}
                        colors={this.state.colors}
                        removeLife={removeLife.bind(this)}
                        increaseLevel={increaseLevel.bind(this)}
                		/>
                    </div>
                }
            </div>
        )
    }
}

export default App;