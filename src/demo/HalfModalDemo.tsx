import React, { useContext } from "react"
import { VStack, NavigationView, Detent, SceneContext, Button, HStack, NavigationContext, ViewProps } from ".."

export const HalfModalDemo:React.FC<{text:string}> = (props) =>{
	const sceneContext = useContext(SceneContext);
	
	return <VStack alignment={"center"}>
			<div>{props.text}</div>
			<button onClick={e => {
				sceneContext.present(
					<NavigationView >
						<ArticleList detent={Detent.medium} />
					</NavigationView>)
			}}>Present (Medium)</button>

			<button onClick={e => {
				sceneContext.present(
					<NavigationView >
						<ArticleList detent={Detent.large} />
					</NavigationView>)
			}}>Present (Large)</button>

			<button onClick={e => {
				sceneContext.present(
					<NavigationView>
						<ArticleList />
					</NavigationView>)
			}}>Present (No)</button>
		</VStack>
}




class ArticleList extends React.Component<ViewProps & {}>{

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


