import { NavigationContext, SceneContext } from "@/components/SceneContext";
import { Detent, ViewProps } from "@/components/ViewProps";
import React from "react";
import { Button, HStack, NavigationView, Sheet, TabItem, TabView, VStack } from "..";


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

const HomeContext = React.createContext<{
	dismiss: Function;
	expandSheet: Function;
}>(null);
class HomeView extends React.Component<{
	text?: string;
}, {
	showArticleList: boolean;
	sheetDetent: Detent
}>{

	constructor(p) {
		super(p);
		this.state = {
			showArticleList: false,
			sheetDetent: Detent.medium,
		}
	}


	render(): React.ReactNode {
		const s = this.state;
		return <HomeContext.Provider value={{
			dismiss: () => {
				this.setState({ showArticleList: false })
			},
			expandSheet: () => {
				this.setState({ sheetDetent: Detent.large })
			},
		}}>
			<VStack alignment={"center"}>
				<div>{this.props.text}</div>
				<button onClick={e => {
					this.setState({
						showArticleList: true,
						sheetDetent: Detent.medium
					})
				}}>Present</button>

				<Sheet isPresented={s.showArticleList}
					detent={s.sheetDetent}
					onClickShadeView={e => {
						this.setState({ showArticleList: false })
					}}>
					<NavigationView>
						<ArticleList
							onCloseButtonTap={e => {
								this.setState({ showArticleList: false })
							}}
							onExpandButtonTap={e => {
								this.setState({ sheetDetent: Detent.large })
							}} />
					</NavigationView>
				</Sheet>
			</VStack>
		</HomeContext.Provider>
	}
}



class ArticleList extends React.Component<ViewProps & {
	onCloseButtonTap: Function;
	onExpandButtonTap: Function;
}>{

	static contextType = NavigationContext;
	declare context: React.ContextType<typeof NavigationContext>;

	static defaultProps = {
		rightBarButtonItem: <HomeContext.Consumer>{context =>
			<Button label="Close" action={e => {
				context.dismiss();
			}} />}
		</HomeContext.Consumer>
	}

	render(): React.ReactNode {
		const p = this.props;
		const s = this.state;
		const ary = Array.from(Array(100), (v, k) => k)
		return <HomeContext.Consumer>{homeContext =>
			<div style={{
				backgroundColor: "var(--bg-color)",
				height: "100%",
				overflowY: "scroll",
			}}>
				<button onClick={e => { p.onCloseButtonTap() }}>Dismiss</button>
				<button onClick={e => { p.onExpandButtonTap() }}>Expand</button>
				{ary.map(x => {
					return <ArticleCell id={x} key={x} onClick={e => {
						homeContext.expandSheet();
						this.context.push(<ArticleView
							text={x.toString()}
						/>)
					}} />
				})}
			</div>
		}</HomeContext.Consumer>
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
		rightBarButtonItem: <HomeContext.Consumer>{context =>
			<Button label="Close" action={e => {
				context.dismiss();
			}} />}
		</HomeContext.Consumer>
	}

	render(): React.ReactNode {
		return <div style={{ backgroundColor: "var(--bg-color)" }}>
			<div>ArticleView {this.props.text}</div>
		</div>
	}
}


