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

export class NavigationView extends React.Component<{
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
		this.onWindowResized = this.onWindowResized.bind(this);
	}

	componentDidMount(): void {
		window.addEventListener('resize', this.onWindowResized);
		this.onWindowResized();
	}


	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResized);
	}

	onWindowResized() {
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

	render() {
		const s = this.state;
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
				{/* AnimatePresenceによって、exit アニメーションを有効に出来ます */}
				<AnimatePresence initial={false}>
					{s.stack.map((x, i) => {
						const variantName = i == (s.stack.length - 1) ? "focus" : "unfocus";
						return <Container
							key={i}
							zIndex={i}
							variantName={variantName}
							view={x}
							windowWidth={s.windowWidth}
						/>
					})}

				</AnimatePresence>
			</NavigationContext.Provider>
		</div>
	}
}


class Container extends React.Component<{
	view: ViewProps;
	windowWidth: number;
	variantName: string;
	zIndex: number;
}>{

	render() {
		const p = this.props;
		const initX = this.props.windowWidth;
		return <motion.div
			variants={{
				"focus": { x: 0, filter: "brightness(1)" },
				"unfocus": { x: -100, filter: "brightness(0.8)" }
			}}
			initial={{ x: initX }}
			animate={p.variantName}
			exit={{ x: initX }}
			transition={{
				ease: "easeOut",
				// duration: 1,
			}}
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				backgroundColor: "white",
				zIndex: p.zIndex,
			}}>
			<VStack style={{ height: "100%" }}>
				{p.view}
			</VStack>
		</motion.div>
	}
}



export class NavigationBar extends React.Component<{
	leftItem?: ReactNode;
	rightItem?: ReactNode;
	title: string;
}>{

	// 特に指定されていなければ Back ボタンを表示
	get leftBarButtonItem(): ReactNode {
		if( this.props.leftItem ){
			return this.props.leftItem;
		}
		return this.backButton
	}

	get backButton() {
		return <NavigationContext.Consumer>{context =>
			<HStack style={{
				color: "var(--key-color)"
			}} onClick={e => {
				context.pop();
			}}>
				<div className="material-symbols-rounded" style={{ fontSize: 26, fontWeight: 400, marginLeft: -14 }}>arrow_back_ios_new</div>
				<Text size={16}>Back</Text>
			</HStack>

		}</NavigationContext.Consumer>
	}

	render(): React.ReactNode {
		const p = this.props;
		return <HStack style={{
			position: "relative",
			height: 44,
			padding: "0 16px",
			flexShrink: 0,
			backgroundColor: "var(--bg-color)",
			borderBottom: "solid 0.5px var(--separator)"
		}}>

			<VStack alignment={"center"} justifyContent={"center"} style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				pointerEvents: "none",
			}}>
				<Text size={16} bold>{p.title}</Text>
			</VStack>

			{this.leftBarButtonItem}
			<Spacer />
			{p.rightItem}

		</HStack>
	}
}

