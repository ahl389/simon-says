import React, { Component } from 'react';
import Tile from './Tile.js';
import Message from './Message.js';
import Instructions from './Instructions.js';

class Level extends Component {
    constructor(props) {
		super(props);
        
		this.state = {
			levelFailed: false,
            clickCount: 0
		};
        
        this.pattern = this.createPattern();
        this.showPattern = this.showPattern.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        this.showPattern();
    }
    
 		//    componentDidUpdate() {
		//         if (this.state.clickCount === 0) {
		//             this.showPattern();
		// }
		//     }
		//

    createPattern() {
        const pattern = [];
        
        for (let i = 0; i < this.props.patternLength; i++) {
            pattern.push(Math.round(Math.random() * (this.props.tileCount - 1)));
        }
        
        return pattern;
    }
    
	generateTiles() {
        let tiles = [];
		let colorIndex = 0;
		
		for (let i = 0; i < this.props.tileCount; i++) {
			if (colorIndex > this.props.colors.length - 1) {
				colorIndex = 0;
			}
			
			tiles.push(<Tile 	
                        key={i}
                        id={i} 
					    color={this.props.colors[colorIndex]}
                        pattern={this.pattern}
                        comparePattern={this.comparePattern.bind(this)}
						totalTiles={this.props.tileCount}
					    />
			);
			
			colorIndex += 1;
		}
        
        return tiles;
	}
    
    handleClick() {
        this.setState({
            levelFailed: false,
            clickCount: 0,
			showRepeatButton: true
        });
    }
	
    showPattern() {
        let i = 0;
        let level = this;
		
		this.setState({
			showRepeatButton: false
		});
		
		document.querySelector('.game').classList.add('disabled');
		
        setTimeout(function() {
            highlightTile(i);
        }, 1000);
		
        function highlightTile(i) {
            if (i < level.pattern.length) {
                const id = level.pattern[i];
                const tile = document.querySelector(`.tile-${id}`);

                if (tile) {
                    tile.classList.add('highlight');
                    i += 1;

                    setTimeout(function(){
                        tile.classList.remove('highlight');

                        setTimeout(function(){
                            return highlightTile(i);
                        }, 200);
                    }, 700);
                }
            } else {
            	document.querySelector('.game').classList.remove('disabled');
            } 
        }
    }
	 
    comparePattern(id) {  
        if (this.pattern[this.state.clickCount] !== id) {
			this.levelFailed();
        } else {
			this.correctlyGuessedTile(); 
        }
    }
	
	levelFailed() {
		const removeLife = this.props.removeLife;
		
        this.setState({
            levelFailed: true,
            clickCount: this.state.clickCount + 1
        });
		
		setTimeout(function(){
            removeLife();
		}, 600);
	}
	
	correctlyGuessedTile() {
		if (this.state.clickCount < this.pattern.length - 1) {
            this.setState({
                clickCount: this.state.clickCount + 1
            });
		} else {
			const increaseLevel = this.props.increaseLevel;
		
			setTimeout(function(){
	            increaseLevel();
			}, 600);
		}
	}
	
    render() {
		const showRepeatButton = this.state.showRepeatButton;
		const showInstructions = this.props.id === 0 || this.state.showInstructions;
		
        return (
            <div className = "game-board">
				{ showRepeatButton
				  ? <button className="button repeat-pattern" onClick={this.showPattern}><i class="fas fa-redo"></i></button>
				  : ''	}
				
                { ! this.state.levelFailed
                  ? <div className="level">

  						{ showInstructions
  						  ? <Instructions/>
  						  : '' }
					
                		{ this.generateTiles() }
                	</div>
				  : <button className="button tryAgain" onClick={this.handleClick}>Try again?</button> }
            </div>
        )
    }
}

export default Level;