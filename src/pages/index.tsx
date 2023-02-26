import { NavigationContext, SceneContext } from "@/components/SceneContext";
import { Detent } from "@/components/ViewProps";
import React from "react";
import { HStack, NavigationStack, Sheet, TabItem, TabView, VStack } from "..";


export default class IndexPage extends React.PureComponent {

	render() {
		return <TabView items={[
			new TabItem("Home", "/images/home.svg", <HomeView />),
			new TabItem("Weather", "/images/weather.svg", <HomeView />),
			new TabItem("Search", "/images/search.svg", <HomeView />),
			new TabItem("Account", "/images/profile.svg", <HomeView />),
		]} />
	}
}


class HomeView extends React.Component<{
	text?: string;
}, {
	showArticleList: boolean;
	articleListDetent: Detent
}>{

	constructor(p) {
		super(p);
		this.state = {
			showArticleList: false,
			articleListDetent: Detent.medium,
		}
	}

	render(): React.ReactNode {
		const s = this.state;
		return <VStack alignment={"center"}>
			<div>{this.props.text}</div>
			<button onClick={e => {
				this.setState({ showArticleList: true, articleListDetent: Detent.medium })
			}}>Present</button>

			<Sheet isPresented={s.showArticleList}
				detent={s.articleListDetent}
				onClickShadeView={e => {
					this.setState({ showArticleList: false })
				}}>
				<ArticleList
					onCloseButtonTap={e => {
						this.setState({ showArticleList: false })
					}}
					onExpandButtonTap={e => {
						this.setState({ articleListDetent: Detent.large })
					}} />
			</Sheet>
		</VStack>
	}
}



class ArticleList extends React.Component<{
	onCloseButtonTap: Function;
	onExpandButtonTap: Function;
}>{

	static contextType = SceneContext;
	declare context: React.ContextType<typeof SceneContext>;

	render(): React.ReactNode {
		const p = this.props;
		const ary = Array.from(Array(100), (v, k) => k)
		return <NavigationStack>
			<div style={{
				backgroundColor: "var(--bg-color)",
				height: "100%",
				overflowY: "scroll",
			}}>
				<button onClick={e => { p.onCloseButtonTap() }}>Dismiss</button>
				<button onClick={e => { p.onExpandButtonTap() }}>Expand</button>
				{ary.map(x => {
					return <ArticleCell id={x} key={x} onClick={e => {
						// navContext.push(<ArticleView text={x.toString()} />)
					}} />
				})}
			</div>
		</NavigationStack>

		/*
		return <NavigationView>
			<NavigationContext.Consumer>{navContext =>
				<ScrollView axis="vertical" style={{
					backgroundColor: "var(--bg-color)"
				}}>
					<button onClick={e => {
						this.context.dismiss();
					}}>Dismiss</button>

					<button onClick={e => {
						this.context.setDetent(Detent.large)
					}}>Expand</button>

					{ary.map(x => {
						return <ArticleCell id={x} key={x} onClick={e => {
							navContext.push(<ArticleView text={x.toString()} />)
						}} />
					})}
				</ScrollView>
			}
			</NavigationContext.Consumer>
		</NavigationView>
		*/
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


