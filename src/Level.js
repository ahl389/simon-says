import React, { Component } from 'react';
import Tile from './Tile.js';


class Level extends Component {
    constructor(props) {
		super(props);
        
		this.state = {
			levelEnded: false,
            clickCount: 0,
			tilesDisabled: true
		};
        
        this.tiles = [];
        this.pattern = this.createPattern();
        this.userPattern = [];
        this.showPattern = this.showPattern.bind(this);
        this.handleClick = this.handleClick.bind(this);
		this.enableTiles = this.enableTiles.bind(this);
    }
    
    componentDidMount() {
        this.showPattern();
    }
    
    componentDidUpdate() {
        if (this.state.tilesDisabled) {
            this.showPattern();
        }
    }
    
	set tilesDisabled(disabled) {
		this.setState({
			tilesDisabled: false
		});
	}
	
    createPattern() {
        const pattern = [];
        
        for (let i = 0; i < this.props.patternLength; i++) {
            pattern.push(Math.ceil(Math.random() * this.props.tileCount - 1));
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
						disabled={this.state.tilesDisabled}
					    />
			);
			
			colorIndex += 1;
		}
        
        return tiles;
	}
    
    handleClick() {
        this.setState({
            levelEnded: false,
			tilesDisabled: true,
            clickCount: 0
        });
    }
	
	enableTiles() {
		this.setState({
			tilesDisabled: false
		});
	}
    
    showPattern() {
        let i = 0;
        let level = this;
 	   	var help;
		
        setTimeout(function() {
            help = highlightTile(i);
        }, 1250);
		
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
            	return 'done!'
            } 
        }
    }
	 
    comparePattern(id) {        
        if (this.state.clickCount < this.pattern.length - 1) {    
            if (this.pattern[this.state.clickCount] !== id) {
                this.setState({
                    levelEnded: true,
                    clickCount: this.state.clickCount + 1
                });
                
                const removeLife = this.props.removeLife;
                removeLife();
            } else {
                this.setState({
                    clickCount: this.state.clickCount + 1
                });
            }
        } else {
            const increaseLevel = this.props.increaseLevel;
            increaseLevel();
        }
    }
    
    render() {
		const disabled = this.state.tilesDisabled ? 'disabled' : 'enabled';
		const classes = `level ${disabled}`;
        return (
            <div className = "game-board">
                { ! this.state.levelEnded
                  ? <div className ={classes}>
						{ this.props.id == 0
						  ? <div className = "instructions">
								Watch the pattern. When you are ready, click the Got It button and then use your mouse to repeat the displayed pattern by clicking on the same tiles in the same order.
							</div>
						  : ''
						}
						
					
                		{ this.generateTiles() }
						
						{ ! this.state.tilesDisabled
						  ? ''
						  : <button className="button gotit" onClick={this.enableTiles}>Got It</button>
						}
                	</div>
                  : <button className="button" onClick={this.handleClick}>Try again?</button>
                }
            </div>
        )
    }
}

export default Level;