import { NavigationContext } from "@/components/NavigationView";
import { Scene, SceneContext } from "@/components/Scene";
import { Detent, ViewProps } from "@/components/ViewProps";
import PageViewDemo from "@/demo/PageViewDemo";
import React from "react";
import { Button, HStack, NavigationView, TabItem, TabView, VStack } from "..";
import NavigationDemo from "@/demo/NavigationViewDemo";
import CarouselDemo from "@/demo/CarouselDemo";


export default class IndexPage extends React.PureComponent {

	render() {
		return <Scene>
			<TabView items={[
				new TabItem("Home", "/images/home.svg", <CarouselDemo />),
				new TabItem("Weather", "/images/weather.svg", <PageViewDemo />),
				new TabItem("", null, <PageViewDemo />),
				new TabItem("Search", "/images/search.svg", <NavigationDemo />),
				new TabItem("Account", "/images/profile.svg", <PresentDemo />),
			]}>
				<img src="/images/promoteButton.svg" style={{
					position:"absolute",
					bottom:0,
					left:"50%",
					transform:"translateX(-50%)",
				}} />
			</TabView>
		</Scene>
	}
}





class PresentDemo extends React.Component<{
	text?: string;
}>{

	render(): React.ReactNode {
		const s = this.state;
		return <SceneContext.Consumer>{sceneContext =>
			<VStack alignment={"center"}>
				<div>{this.props.text}</div>
				<button onClick={e => {
					sceneContext.present(
						<NavigationView detent={Detent.medium}>
							<ArticleList />
						</NavigationView>)
				}}>Present</button>
			</VStack>
		}</SceneContext.Consumer>
	}
}



class ArticleList extends React.Component<ViewProps & {
}>{

	static contextType = NavigationContext;
	declare context: React.ContextType<typeof NavigationContext>;

	static defaultProps = {
		title: "Article List",
		rightBarButtonItem: <SceneContext.Consumer>{context =>
			<Button label="Close" action={e => {
				context.dismiss();
			}} />}
		</SceneContext.Consumer>
	}

	render(): React.ReactNode {
		const p = this.props;
		const s = this.state;
		const ary = Array.from(Array(100), (v, k) => k)
		return <SceneContext.Consumer>{sceneContext =>
			<div className="ArticleList"
				style={{
					backgroundColor: "var(--bg-color)",
					height: "100%",
					overflowY: "scroll",
				}}>
				<button onClick={e => {
					sceneContext.dismiss();
				}}>Dismiss</button>
				<button onClick={e => {
					sceneContext.changeDetent(Detent.large);
				}}>Expand</button>
				{ary.map(x => {
					return <ArticleCell id={x} key={x} onClick={e => {
						sceneContext.changeDetent(Detent.large)
						this.context.push(<ArticleView text={x.toString()} />)
					}} />
				})}
			</div>
		}</SceneContext.Consumer>
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



class ArticleView extends React.Component<ViewProps & {
	text: string,
}>{

	static defaultProps = {
		title: "Article View",
		rightBarButtonItem: <SceneContext.Consumer>{context =>
			<Button label="Close" action={e => {
				context.dismiss();
			}} />}
		</SceneContext.Consumer>
	}

	render(): React.ReactNode {
		return <div style={{ backgroundColor: "var(--bg-color)" }}>
			<div>ArticleView {this.props.text}</div>
		</div>
	}
}


