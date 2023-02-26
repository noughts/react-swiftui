import React, { ReactNode } from "react"

export class NavigationLink extends React.Component<{
	children: ReactNode;
	isActive:boolean;
}>{
	render(): React.ReactNode {
		const p = this.props;
		return p.children
	}
}