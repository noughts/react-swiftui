import React from "react"
import { Button, NavigationContext, NavigationView, VStack, ViewProps } from ".."


export default class NavigationDemo extends React.Component {
	render(): React.ReactNode {
		return <NavigationView>
			<Page1 navigationBarHidden={true} />
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

	render(): React.ReactNode {
		return <VStack spacing={8}>
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
