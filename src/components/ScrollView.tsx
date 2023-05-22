import React, { CSSProperties, ReactNode } from "react";
import { Property } from 'csstype';


export default class ScrollView extends React.Component<{
	axis?: "vertical" | "horizontal"
	padding?: number;
	innerRef?;
	style?: CSSProperties;
	negativeMargin?: number;
	children: ReactNode;
	scrollBarHidden?:boolean;
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
		const p = this.props;
		let style = this.style;
		if (p.style) {
			style = Object.assign(style, p.style);
		}
		if (p.negativeMargin > 0) {
			style.marginLeft = -p.negativeMargin;
			style.marginRight = -p.negativeMargin;
			style.paddingLeft = p.negativeMargin;
			style.paddingRight = p.negativeMargin;
		}
		const optionClassName = p.scrollBarHidden ? "scrollBarHidden" : "";
		return <>
			<div className={`ScrollView ${optionClassName}`} ref={p.innerRef} style={style}>{p.children}</div>
			<style>{`
				.scrollBarHidden::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</>

	}
}


