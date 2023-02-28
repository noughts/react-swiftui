import { AnimatePresence, motion } from "framer-motion";
import React, { CSSProperties, ReactNode } from "react";
import Button from "./Button";
import HStack from "./HStack";
import Spacer from "./Spacer";
import { ViewProps } from "./ViewProps";
import VStack from "./VStack";
import Text from "./Text";

export const NavigationContext = React.createContext<{
	push?: (content: React.ReactElement) => void;
	pop?: Function;
}>({});

export class NavigationView extends React.Component<ViewProps & {
	style?: CSSProperties;
	children?: React.ReactElement<ViewProps>;
}, {
	stack: any[];
	windowWidth: number;
}>{

	constructor(p) {
		super(p);
		this.state = {
			stack: [p.children],
			windowWidth: 0,
		}
		this.push = this.push.bind(this);
		this.pop = this.pop.bind(this);
	}

	componentDidMount(): void {
		this.setState({ windowWidth: window.innerWidth });
	}

	push(view: React.ReactElement) {
		const newAry = this.state.stack;
		newAry.push(view);
		this.setState({ stack: newAry })
	}
	pop() {
		const newAry = this.state.stack;
		newAry.pop();
		this.setState({ stack: newAry })
	}

	get topView(): React.ReactElement<ViewProps> {
		return this.state.stack[this.state.stack.length - 1];
	}

	// 特に指定されていなければ Back ボタンを表示
	get leftBarButtonItem() {
		if (this.topView.props.leftBarButtonItem) {
			return this.topView.props.leftBarButtonItem;
		}
		if (this.state.stack.length <= 1) {
			return null;
		}
		return <NavigationContext.Consumer>{context =>
			<Button label="< Back" action={e => {
				context.pop();
			}} />
		}</NavigationContext.Consumer>

	}

	render() {
		const p = this.props;
		let style: CSSProperties = {
			position: "relative",
			width: "100%",
			height: "100%",
		};
		if (p.style) {
			style = Object.assign(style, p.style);
		}

		return <div className="NavigationView" style={style}>
			<NavigationContext.Provider value={{
				push: this.push,
				pop: this.pop,
			}}>
				<VStack style={{
					height: "100%",
				}}>
					<NavigationBar
						title={this.props.title}
						rightItem={this.topView.props.rightBarButtonItem}
						leftItem={this.leftBarButtonItem}
					/>
					<div style={{
						position: "relative",
						flexGrow: 2,
					}}>
						{/* AnimatePresenceによって、exit アニメーションを有効に出来ます */}
						<AnimatePresence>
							{this.state.stack.map((x, i) => {
								return <View key={i} windowWidth={this.state.windowWidth}>{x}</View>;
							})}
						</AnimatePresence>
					</div>
				</VStack>
			</NavigationContext.Provider>
		</div>
	}
}


class View extends React.Component<{
	children;
	windowWidth: number;
}>{
	render(): React.ReactNode {
		const initX = this.props.windowWidth;
		return <motion.div
			animate={{ x: 0 }}
			initial={{ x: initX }}
			exit={{ x: initX }}
			transition={{
				ease: "easeOut"
			}}
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				backgroundColor: "white",
			}}>
			{this.props.children}
		</motion.div>
	}
}



class NavigationBar extends React.Component<{
	leftItem?: ReactNode;
	rightItem?: ReactNode;
	title:string;
}>{
	render(): React.ReactNode {
		const p = this.props;
		return <HStack style={{
			height: 44,
			padding:"0 8px",
			flexShrink: 0,
			backgroundColor: "var(--bg-color)",
			// borderTop: "solid 0.5px var(--separator)",
			borderBottom: "solid 0.5px var(--separator)"
		}}>
			{p.leftItem}
			<Spacer/>
			<Text size={16} bold>{p.title}</Text>
			<Spacer />
			{p.rightItem}
		</HStack>
	}
}