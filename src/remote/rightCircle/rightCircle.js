import React, {Component} from 'react'

export default class RightCircle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focused: false,
		};
	}

	componentWillUpdate() {
		
	}

	loseFocus(e) {
		console.log("e", e);
		this.setState({focused: false})
		// console.log("!!", this.circle);
		this.circle.style.zIndex = 600;
		setTimeout(() => {
			this.circle.style.zIndex = "";
		}, 1000)

		// e.target.
	}

	render() {
		
		var active = this.state.focused ? "active" : "";
		var focused = this.state.focused ? " focused " : "";
		console.log("props", this.props, ":", active, this.state.focused);
		
		var content = "";
		if (this.state.focused) {
			content = (this.props.children)
		} else {
				content = (
					<i className={ this.props.icon + " fa fa-4x center primaryText"} aria-hidden="true"></i>
				)
		}

		
		return (
			<div>
				<div 
					className={"rightCircle transition-one-second " + this.props.className + focused } 
					onClick={() => {this.setState({focused: true})}}
					ref={(ele) => {this.circle = ele}}
				>
					{content}
				</div>
				<div className={" transition-one-second backdrop " + active}  onClick={this.loseFocus.bind(this)}>
					
				</div>
			</div>	
		)
	}
}