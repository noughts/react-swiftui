import React, { ReactNode } from "react";
import Divider from "./Divider";
import HStack from "./HStack";
import ScrollView from "./ScrollView";
import VStack from "./VStack";

export default class List extends React.Component<{
	children:any;
}>{

	static defaultProps = {
		alignment: "stretch",
	}

	render() {
		const children: any[] = this.props.children as any[];
		const style = {
			backgroundColor: "#F2F2F7",
			padding: 16,
		}
		return <>
			<ScrollView>
				<VStack style={style}>
					<div style={{
						borderRadius:16,
						backgroundColor:"white",
					}}>
						{children.map((x, index) => {
							return <React.Fragment key={index}>
								<Cell>{x}</Cell>
								{index < children.length - 1 &&
									<Divider />
								}
							</React.Fragment>
						})}
					</div>
				</VStack>
			</ScrollView>
		</>
	}
}


class Cell extends React.Component<{
	children:ReactNode;
}>{
	render(): React.ReactNode {
		return <HStack style={{
			height: 44,
			paddingLeft:16,
			paddingRight:16,
		}}>{this.props.children}</HStack>
	}
}