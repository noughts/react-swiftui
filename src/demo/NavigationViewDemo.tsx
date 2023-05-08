import React from "react"
import { Button, NavigationContext, NavigationView, ViewProps } from ".."


export default class NavigationDemo extends React.Component {
	render(): React.ReactNode {
		return <NavigationView>
			<Page1 navigationBarHidden={true} />
		</NavigationView>
	}
}

class Page1 extends React.Component<ViewProps,{
	counter:number;
}>{


	static contextType = NavigationContext;
	declare context: React.ContextType<typeof NavigationContext>;

	constructor(p){
		super(p);
		console.log("Page1 constructor")
		this.state = {
			counter: 0,
		}
	}

	render(): React.ReactNode {
		return <div>
			<div>Page1</div>
			<div>{this.state.counter}</div>
			<Button label="push" action={e => {
				this.context.push(<Page2 />);
			}} />

			<Button label="plus" action={e=>{
				const newCount = this.state.counter + 1;
				this.setState({counter:newCount});
			}}/>

		</div>
	}
}



class Page2 extends React.Component {

	static contextType = NavigationContext;
	declare context: React.ContextType<typeof NavigationContext>;

	render(): React.ReactNode {
		return <div>
			<div>Page2</div>
			<Button label="pop" action={e => {
				this.context.pop();
			}} />
		</div>
	}
}
