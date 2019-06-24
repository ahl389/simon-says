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
	
    generateStyles(color) {
		let width;
		let height;
		
		if (this.props.totalTiles > 6) {
			width = '100px';
			height = '100px'
		} else if (this.props.totalTiles > 4) {
			width ='150px';
			height = '150px';
		} else {
			width = '200px';
			height = '200px';
		}
		
        return ({
            backgroundColor: color,
			width: width,
			height: height
        });
    }
    
    render() {
        const highlight = this.state.mouseDown ? 'highlight' : '';
        const classes = `tile tile-${this.props.id} ${highlight} color-${this.props.id}`;
        const style = this.generateStyles(this.props.color);
        
        return (
        	<div className={classes} style={style} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        	</div>
        )
    }
}

export default Tile;