import React, { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { AnyTransition, Detent, ViewProps } from "./ViewProps";
import { SceneContext } from "./SceneContext";



export default class Scene extends React.Component<{
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
		this.present = this.present.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	present(content: React.ReactElement<ViewProps>) {
		const newAry = this.state.stack;
		const newPage = this.createPageView(content);
		newAry.push(newPage);
		this.setState({ stack: newAry })
	}
	dismiss() {
		const newAry = this.state.stack;
		newAry.pop();
		this.setState({ stack: newAry })
	}

	_initial(content: React.ReactElement<ViewProps>) {
		if (!this.state) {
			return {};
		}
		switch (content.props.transition) {
			case AnyTransition.opacity:
				return { opacity: 0 };
			case AnyTransition.slide:
			default:
				return { translateY: this.root_ref.current.clientHeight };

		}
	}
	_animate(content: React.ReactElement<ViewProps>) {
		if (!this.state) {
			return {};
		}
		switch (content.props.transition) {
			case AnyTransition.opacity:
				return { opacity: 1 };
			case AnyTransition.slide:
			default:
				switch(content.props.detent){
					case Detent.medium:
						return { translateY: this.root_ref.current.clientHeight / 2 };
					case Detent.large:
					default:
						return { translateY: 0 };
				}
		}
	}

	createPageView(content: React.ReactElement<ViewProps>) {
		const key = this.state ? this.state.stack.length : 0;
		const initial = this._initial(content);
		const animate = this._animate(content);
		return <motion.div
			key={key}
			initial={initial}
			animate={animate}
			exit={initial}
			transition={{
				ease: "easeOut",
				// duration:1,
			}}
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
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
			height: "calc(var(--vh, 1vh) * 100)",
			overflow: "hidden",
		};
		if (p.style) {
			style = Object.assign(style, p.style);
		}

		return <div ref={this.root_ref} className="Root" style={style}>
			<SceneContext.Provider value={{
				present: this.present,
				dismiss: this.dismiss,
			}}>
				{/* AnimatePresenceによって、exit アニメーションを有効に出来ます */}
				<AnimatePresence>
					{this.state.stack.map(x => {
						return x;
					})}
				</AnimatePresence>
			</SceneContext.Provider>
		</div>
	}
}


