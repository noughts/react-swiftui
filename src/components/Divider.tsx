import React, { CSSProperties } from "react";
import { Property } from "csstype"


export default class Divider extends React.Component<{
	width?: number;
	color?: Property.Color;
	thickness: string;
}>{

	static defaultProps = {
		color: "var(--separator)",
		thickness: "0.5px",
	}

	render() {
		const p = this.props;
		const style: CSSProperties = {
			borderTop: `solid ${p.thickness} ${p.color}`
		}
		style.borderBottomWidth
		style.color
		if (p.width) {
			style.width = p.width;
		}
		return <div style={style} />
	}
}


