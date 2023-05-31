import React, { CSSProperties } from "react";


export default class Button extends React.Component<{
	buttonStyle?: "bordered" | "borderless" | "borderedProminent"
	bold?: boolean;
	disabled?: boolean;
	action?: Function;
	label: string;
	flexGrow?: number;
	style?: CSSProperties;
}>{

	static defaultProps = {
		buttonStyle: "borderless",
		flexGrow: 0,
	}

	render() {
		const p = this.props;
		const style: CSSProperties = {
			border: "none",
			backgroundColor: "transparent",
			fontSize: 15,
			color: "var(--key-color)",
			lineHeight: 1,
			padding: 0,
			flexGrow: p.flexGrow,
		};
		if (p.bold) {
			style.fontWeight = "bold";
		}
		if (p.disabled) {
			style.opacity = 0.2;
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
		return <button style={{ ...style, ...this.props.style }} onClick={e => {
			if (p.action && !p.disabled) {
				p.action();
			}
		}}>{p.label}</button>
	}
}


