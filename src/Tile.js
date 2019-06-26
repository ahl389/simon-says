import React, { Component } from 'react';


class Tile extends Component {  
    constructor(props) {
		super(props);
        
		this.state = {
			mouseDown: false
		};
        this.myRef = React.createRef();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleClick = this.handleClick.bind(this);
    }
    
	handleMouseDown() {
		console.log(this.myRef)
		console.log(this.myRef.current)
		this.myRef.current.classList.toggle('highlight');
	}
    
	handleMouseUp() {
    	this.myRef.current.classList.remove('highlight-tap');
        const comparePattern = this.props.comparePattern;
        comparePattern(this.props.id);
	}
	
	handleClick() {
		this.myRef.current.classList.toggle('highlight-tap');
        const comparePattern = this.props.comparePattern;
        comparePattern(this.props.id);
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
        const tileSize = this.generateTileSize();
        const classes = `tile tile-${this.props.id} ${tileSize}`;
		const style = {
            backgroundColor: this.props.color
        };
        
        return (
        	<div className={classes} style={style} onClick={this.handleClick} ref={this.myRef}>
        	</div>
        )
    }
}

export default Tile;