
import { UIPageControl } from "@/components/UIPageControl";
import React from "react"
import { PageView, VStack } from ".."

export default class PageViewDemo extends React.Component<{}, {
	currentPage: number;
}>{
	constructor(p) {
		super(p);
		this.state = {
			currentPage: 0
		}
	}

	render(): React.ReactNode {
		return <VStack spacing={16} alignment="center" style={{ backgroundColor: "gray", height: "100%" }}>
			<div style={{ position: "relative" }}>
				<PageView style={{
					height: 300,
					width: 300,
					backgroundColor: "blue"
				}}
					onPageChanged={page => {
						console.log(page)
						this.setState({ currentPage: page });
					}}>
					<View1 />
					<View2 />
					<View3 />
				</PageView>

				<UIPageControl style={{
					position: "absolute",
					zIndex: 10,
					bottom: 16,
				}} numberOfPages={3} currentPage={this.state.currentPage} pageIndicatorTintColor="white" />
			</div>

		</VStack>
	}
}




class View1 extends React.Component {
	render(): React.ReactNode {
		return <div>view1</div>
	}
}

class View2 extends React.Component {
	render(): React.ReactNode {
		return <div style={{ backgroundColor: "green", height:"100%" }}>view2</div>
	}
}

class View3 extends React.Component {
	render(): React.ReactNode {
		return <div>view3</div>
	}
}