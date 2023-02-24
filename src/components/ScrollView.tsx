import React, { CSSProperties, ReactNode } from "react";
import { Property } from 'csstype';


export default class ScrollView extends React.Component<{
	axis?: "vertical" | "horizontal"
	padding?: number;
	innerRef?;
	style?: CSSProperties;
	negativeMargin?:number;
	children:ReactNode;
}>{
	static defaultProps = {
		axis: "vertical",
		padding: 0,
	}


	get style() {
		let style: CSSProperties = {};
		if (this.props.axis == "horizontal") {
			style = {
				overflowY: "hidden",
				overflowX: "scroll",
				padding: this.props.padding,
			}
		} else {
			style = {
				height: "100%",
				overflowX: "hidden",
				overflowY: "scroll",
				padding: this.props.padding,
			}
		}
		return style;
	}

	render() {
		const p =this.props;
		let style = this.style;
		if (p.style) {
			style = Object.assign(style, p.style);
		}
		if( p.negativeMargin ){
			style.marginLeft = -16;
			style.marginRight = -16;
			style.paddingLeft = 16;
			style.paddingRight = 16;
		}
		return <div className="ScrollView" ref={p.innerRef} style={style}>{p.children}</div>
	}
}


