import React, { CSSProperties } from "react"
import NavigationEvent from "./NavigationEvent";


export default class NavigationLink extends React.Component<{
	children?: React.ReactNode,
	destination: React.ReactNode,
	type: "push" | "present",
	style?: CSSProperties;
}>{

	onClick() {
		dispatchEvent(new NavigationEvent(this.props.type, this.props.destination))
	}

	render() {
		const p = this.props;
		return <div style={p.style} className="NavigationLink" onClick={e => {
			this.onClick();
		}}>
			{this.props.children}
		</div>
	}
}