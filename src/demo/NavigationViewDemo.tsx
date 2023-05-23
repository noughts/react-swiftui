import React from "react"
import { Button, NavigationContext, NavigationView, VStack, ViewProps } from ".."
import { NavigationBar } from "@/components/NavigationView";


export default class NavigationDemo extends React.Component {
	render(): React.ReactNode {
		return <NavigationView>
			<Page1 />
		</NavigationView>
	}
}



class Page1 extends React.Component<ViewProps, {
	counter: number;
}>{

	static contextType = NavigationContext;
	declare context: React.ContextType<typeof NavigationContext>;

	constructor(p) {
		super(p);
		console.log("Page1 constructor")
		this.state = {
			counter: 0,
		}
	}

	get postButton() {
		return <Button label="Post" style={{ fontWeight: "bold" }} action={e => {
			const newCount = this.state.counter + 1;
			this.setState({ counter: newCount });
		}} />
	}

	render(): React.ReactNode {
		return <VStack spacing={8}>
			<NavigationBar
				title="Page 1"
				rightItem={this.postButton}
			/>
			<div>Page1</div>
			<div>{this.state.counter}</div>
			<Button label="push" action={e => {
				this.context.push(<Page2 />);
			}} />

			<Button label="plus" action={e => {
				const newCount = this.state.counter + 1;
				this.setState({ counter: newCount });
			}} />

		</VStack>
	}
}



class Page2 extends React.Component<ViewProps, {
	counter: number;
}>{


	static contextType = NavigationContext;
	declare context: React.ContextType<typeof NavigationContext>;

	constructor(p) {
		super(p);
		console.log("Page2 constructor")
		this.state = {
			counter: 0,
		}
	}

	render(): React.ReactNode {
		return <VStack spacing={8}>
			<NavigationBar
				title="Page 2"
				leftItem={NavigationBar.backButton}
			/>
			<div>Page2</div>
			<div>{this.state.counter}</div>
			<Button label="pop" action={e => {
				this.context.pop();
			}} />

			<Button label="plus" action={e => {
				const newCount = this.state.counter + 1;
				this.setState({ counter: newCount });
			}} />
		</VStack>
	}
}
