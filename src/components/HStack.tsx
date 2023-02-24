import React, { CSSProperties } from "react";
import { Property } from 'csstype';


export default class HStack extends React.Component<{
	alignment?: Property.AlignItems
	justifyContent?: Property.JustifyContent;
	spacing?: number;
	children?: any;
	padding?: Property.Padding | number;
	height?: number;
	onClick?: Function;
	style?: CSSProperties;
	reverse?: boolean;
	wrap?: boolean;
}>{

	static defaultProps = {
		alignment: "center",
	}


	render() {
		const p = this.props;
		let style: CSSProperties = {
			display: "flex",
			alignItems: p.alignment,
			justifyContent: p.justifyContent,
			gap: p.spacing,
			padding: p.padding,
			// width:"100%" // width:100%するとレイアウトしづらくなるのでやめる
		};
		if (p.height) {
			style.height = p.height;
		}
		if (p.style) {
			style = Object.assign(style, p.style);
		}
		if (p.reverse) {
			style.flexDirection = "row-reverse";
		}
		if (p.wrap) {
			style.flexWrap = "wrap"
		}
		return <div
			className="HStack"
			onClick={x => {
				if (this.props.onClick) {
					this.props.onClick();
				}
			}}
			style={style}>
			{p.children}
		</div>
	}
}


