import React, { Component } from 'react';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.refCanva = React.createRef();
	}

	shouldComponentUpdate(nextProps) {
		this.updateCanvas();

		return true;
	}

	componentDidMount() {
		this.updateCanvas();
	}

	updateCanvas() {
		const ctx = this.refCanva.current.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(50, 50);
		ctx.lineTo(200, 50);
		ctx.stroke();
	}

	render() {
		return <canvas ref={this.refCanva} width="400" height="400"></canvas>;
	}
}

export default Canvas;
