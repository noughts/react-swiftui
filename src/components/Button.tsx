import React, { CSSProperties } from "react";


export default class Button extends React.Component<{
	buttonStyle?: "bordered" | "borderless" | "borderedProminent"
	action?: Function;
	label: string;
	flexGrow?: number;
}>{

	static defaultProps = {
		buttonStyle: "borderless",
		flexGrow: 0,
	}

	render() {
		const p = this.props;
		const style: CSSProperties = {
			border: "none",
			backgroundColor:"transparent",
			fontSize:15,
			fontWeight: "bold",
			color: "var(--key-color)",
			lineHeight: 1,
			padding:0,
			flexGrow: p.flexGrow,
		}
		switch (p.buttonStyle) {
			case "bordered":
				style.backgroundColor = "gray";
				style.padding = 8;
				style.borderRadius = 4;
				break;
			case "borderedProminent":
				style.backgroundColor = "var(--key-color)";
				style.color = "white";
				style.padding = 8;
				style.borderRadius = 4;
				break;
		}
		return <button style={style} onClick={e => {
			if (p.action) {
				p.action();
			}
		}}>{p.label}</button>
	}
}


