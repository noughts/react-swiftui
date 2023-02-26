import React, { ReactNode } from "react"
import HStack from "./HStack";
import Button from "./Button"
import Spacer from "./Spacer";

export class NavigationStack extends React.Component<{
	children: ReactNode;
}>{
	render(): React.ReactNode {
		const p = this.props;
		return <div>
			<NavigationBar />
			{p.children}
		</div>
	}
}

class NavigationBar extends React.Component {
	render(): React.ReactNode {
		return <HStack style={{ height: 44,
			borderTop:"solid 0.5px var(--separator)",
			borderBottom:"solid 0.5px var(--separator)"
		 }}>
			<Button label="Back" />
			<Spacer />
			<Button label="Close" />
		</HStack>
	}
}