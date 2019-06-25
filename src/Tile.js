import React, { Component } from 'react';


class Tile extends Component {  
    constructor(props) {
		super(props);
        
		this.state = {
			mouseDown: false
		};
        
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    
	handleMouseDown() {
		if (!this.props.disabled) {
			this.setState({
			    mouseDown: true
			});
		} else {
			console.log('tiles disabled');
		}
	}
    
	handleMouseUp() {
		if (!this.props.disabled) {
			this.setState({
			    mouseDown: false
			});
        
	        const comparePattern = this.props.comparePattern;
	        comparePattern(this.props.id);
		}
	}
	
    generateTileSize() {
		if (this.props.totalTiles > 6) {
			return 'small';
		} else if (this.props.totalTiles > 4) {
			return 'medium';
		} else {
			return 'large';
		}
    }
    
    render() {
        const highlight = this.state.mouseDown ? 'highlight' : '';
        const tileSize = this.generateTileSize();
        const classes = `tile tile-${this.props.id} ${highlight} color-${this.props.id} ${tileSize}`;
		const style = {
            backgroundColor: this.props.color
        };
        
        return (
        	<div className={classes} style={style} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        	</div>
        )
    }
}

export default Tile;