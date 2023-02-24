import React, { CSSProperties, ReactNode } from "react";
import { Property } from 'csstype';

export default class VStack extends React.Component<{
	alignment?: Property.AlignItems;
	justifyContent?: Property.JustifyContent;
	spacing?: number;
	padding?: Property.Padding | number;
	children?: any;
	style?: CSSProperties;
	onClick?: Function;
	id?: string;
}>{

	static defaultProps = {
		alignment: "stretch",
	}

	render(): React.ReactNode {
		const p = this.props;
		let style: CSSProperties = {
			display: "flex",
			flexDirection: "column",
			alignItems: p.alignment,
			justifyContent: p.justifyContent,
			gap: p.spacing,
			padding: p.padding,
			// flexShrink: 0,// これやるとレイアウトが崩れるケースがあるので任意で。
			// overflow: "hidden",// これするとネガティブマージンによるedge to edgeが表現できないので注意
		};
		if (p.style) {
			style = Object.assign(style, p.style);
		}
		return <div onClick={e => {
			if (p.onClick) {
				p.onClick();
			}
		}} className="VStack" id={this.props.id} style={style}>{p.children}</div>
	}
}


