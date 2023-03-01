import React from "react"
import { PageView } from ".."

export default class PageViewDemo extends React.Component {
	render(): React.ReactNode {
		return <div style={{ backgroundColor: "gray", height: "100%" }}>
			<PageView style={{ height: 300, width: 300, backgroundColor: "white" }}>
				<View1 />
				<View2 />
				<View3 />
			</PageView>
		</div>
	}
}




class View1 extends React.Component {
	render(): React.ReactNode {
		return <div>view1</div>
	}
}

class View2 extends React.Component {
	render(): React.ReactNode {
		return <div>view2</div>
	}
}

class View3 extends React.Component {
	render(): React.ReactNode {
		return <div>view3</div>
	}
}