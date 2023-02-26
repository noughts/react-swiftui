import { NavigationContext, SceneContext } from "@/components/SceneContext"
import { Detent, ViewProps } from "@/components/ViewProps";
import React from "react"
import { VStack, HStack, Scene, ScrollView, TabItem, TabView, NavigationView } from ".."



export default class IndexPage extends React.PureComponent {

	render() {
		return <Scene>
			{/* <TabView items={[
				new TabItem("Home", "/images/home.svg", <Page2 />),
				new TabItem("Weather", "/images/weather.svg", <Page1 />),
				new TabItem("Search", "/images/search.svg", <Page2 />),
				new TabItem("Account", "/images/profile.svg", <Page2 />),
			]} /> */}
			<HomeView text="hogehoge" />
		</Scene>
	}
}


class HomeView extends React.Component<{
	text?: string;
}>{

	static contextType = SceneContext;
	declare context: React.ContextType<typeof SceneContext>;

	render(): React.ReactNode {
		return <VStack alignment={"center"}>
			<div>{this.props.text}</div>
			<button onClick={e => {
				this.context.present(<ArticleList detent={Detent.medium} />);
			}}>Present</button>
		</VStack>
	}
}


class ArticleList extends React.Component<ViewProps & {}>{

	static contextType = SceneContext;
	declare context: React.ContextType<typeof SceneContext>;

	render(): React.ReactNode {
		const ary = Array.from(Array(100), (v, k) => k)
		return <NavigationView>
			<NavigationContext.Consumer>{navContext =>
				<ScrollView axis="vertical" style={{
					backgroundColor: "var(--bg-color)"
				}}>
					<button onClick={e => {
						this.context.dismiss();
					}}>Dismiss</button>

					{ary.map(x => {
						return <ArticleCell id={x} key={x} onClick={e => {
							navContext.push(<ArticleView text={x.toString()} />)
						}} />
					})}
				</ScrollView>
			}
			</NavigationContext.Consumer>
		</NavigationView>
	}
}

class ArticleCell extends React.Component<{
	id: number,
	onClick: Function;
}>{
	render(): React.ReactNode {
		const p = this.props;
		return <HStack>
			<div>hoge{this.props.id}</div>
			<button onClick={e => { p.onClick() }}>Push</button>
		</HStack>
	}
}



class ArticleView extends React.Component<{ text: string }>{

	static contextType = NavigationContext;
	declare context: React.ContextType<typeof NavigationContext>;

	render(): React.ReactNode {
		return <div style={{ backgroundColor: "var(--bg-color)" }}>
			<button onClick={e => {
				this.context.pop();
			}}>Back</button>
			<div>ArticleView {this.props.text}</div>
		</div>
	}
}


