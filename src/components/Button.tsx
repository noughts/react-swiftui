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
			borderRadius: 4,
			padding: 8,
			lineHeight: 1,
			flexGrow: p.flexGrow,
		}
		switch (p.buttonStyle) {
			case "bordered":
				style.backgroundColor = "gray";
				break;
			case "borderedProminent":
				style.backgroundColor = "var(--key-color)";
				style.color = "white";
				break;
		}
		return <button style={style} onClick={e => {
			if (p.action) {
				p.action();
			}
		}}>{p.label}</button>
	}
}


