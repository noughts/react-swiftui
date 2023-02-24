import { ViewProps } from "@/components/ViewProps"
import React from "react"
import { VStack, HStack, Root, ScrollView, TabItem, TabView } from ".."



export default class IndexPage extends React.PureComponent {

	render() {
		return <Root>
			{/* <TabView items={[
				new TabItem("Home", "/images/home.svg", <Page2 />),
				new TabItem("Weather", "/images/weather.svg", <Page1 />),
				new TabItem("Search", "/images/search.svg", <Page2 />),
				new TabItem("Account", "/images/profile.svg", <Page2 />),
			]} /> */}
			<Page2 text="hogehoge" />
		</Root>
	}
}



class Page1 extends React.Component {
	componentDidMount(): void {
		console.log("1 mounted")
	}
	render(): React.ReactNode {
		const ary = Array.from(Array(100), (v, k) => k)
		return <ScrollView axis="vertical">
			{ary.map(x => {
				return <div key={x}>hoge{x}</div>
			})}
		</ScrollView>
	}
}


class Page2 extends React.Component<ViewProps & {
	text:string;
}>{
	componentDidMount(): void {
	}
	render(): React.ReactNode {
		return <VStack alignment={"center"} style={{ height: 400 }}>
			<div>{this.props.text}</div>
			<button onClick={e => {
				this.props.show();
			}}>show</button>
		</VStack>
	}
}