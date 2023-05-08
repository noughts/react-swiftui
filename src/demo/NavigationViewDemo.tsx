import React from "react"
import { Button, NavigationContext, NavigationView, ViewProps } from ".."


export default class NavigationDemo extends React.Component {
	render(): React.ReactNode {
		return <NavigationView>
			<Page1 navigationBarHidden={true} />
		</NavigationView>
	}
}

class Page1 extends React.Component<ViewProps>{

	static contextType = NavigationContext;
	declare context: React.ContextType<typeof NavigationContext>;

	render(): React.ReactNode {
		return <div>
			<div>Page1</div>
			<Button label="push" action={e => {
				this.context.push(<Page2 />);
			}} />
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
