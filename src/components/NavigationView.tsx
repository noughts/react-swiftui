import { AnimatePresence, motion } from "framer-motion";
import React, { CSSProperties } from "react";
import { NavigationContext, SceneContext } from "./SceneContext";

export default class NavigationView extends React.Component<{
	style?: CSSProperties;
	children?: any;
}, {
	stack: any[];
}>{

	root_ref = React.createRef<HTMLDivElement>();

	constructor(p) {
		super(p);
		const page = this.createPageView(p.children);
		this.state = {
			stack: [page],
		}
		this.push = this.push.bind(this);
		this.pop = this.pop.bind(this);
	}

	push(element: React.ReactElement) {
		const newAry = this.state.stack;
		const newPage = this.createPageView(element);
		newAry.push(newPage);
		this.setState({ stack: newAry })
	}
	pop() {
		const newAry = this.state.stack;
		newAry.pop();
		this.setState({ stack: newAry })
	}

	createPageView(content: any) {
		const initX = this.root_ref.current ? this.root_ref.current.clientWidth : 0;
		const key = this.state ? this.state.stack.length : 0;
		return <motion.div
			key={key}
			animate={{
				x: 0,
			}}
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
				zIndex: key,
			}}>
			{content}
		</motion.div>
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

		return <div ref={this.root_ref} className="NavigationView" style={style}>
			<NavigationContext.Provider value={{
				push: this.push,
				pop: this.pop,
			}}>
				{/* AnimatePresenceによって、exit アニメーションを有効に出来ます */}
				<AnimatePresence>
					{this.state.stack.map(x => {
						return x;
					})}
				</AnimatePresence>
			</NavigationContext.Provider>
		</div>
	}
}


