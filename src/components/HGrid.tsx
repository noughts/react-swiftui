import React, { CSSProperties } from "react";
import { Property } from 'csstype';


export default class HGrid extends React.Component<{
	padding?: Property.Padding
	alignment?: Property.AlignItems
	justifyContent?: Property.JustifyContent;
	spacingY?: number;
	spacingX?: number;
	children?: any;
}>{

	static defaultProps = {
		padding: 0,
		spacingX: 0,
		spacingY: 0,
	}


	render() {
		const style: CSSProperties = {
			display: "flex",
			flexWrap: "wrap",
			alignItems: this.props.alignment,
			justifyContent: this.props.justifyContent,
			rowGap: this.props.spacingY,
			columnGap: this.props.spacingX,
			overflow: "hidden",
			padding: this.props.padding
		};
		return <div style={style}>{this.props.children}</div>
	}
}


