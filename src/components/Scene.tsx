import React, { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { AnyTransition, Detent, ViewProps } from "./ViewProps";
import { SceneContext } from "./SceneContext";



export default class Scene extends React.Component<{
	style?: CSSProperties;
	children?: any;
}, {
	stack: React.ReactElement[];
}>{

	root_ref = React.createRef<HTMLDivElement>();

	constructor(p) {
		super(p);
		const page = this.createView(p.children);
		this.state = {
			stack: [page],
		}
		this.present = this.present.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	present(content: React.ReactElement<ViewProps>) {
		const newAry = this.state.stack;
		const newPage = this.createView(content);
		newAry.push(newPage);
		this.setState({ stack: newAry })
	}
	dismiss() {
		const newAry = this.state.stack;
		newAry.pop();
		this.setState({ stack: newAry })
	}
	setDetent(detent: Detent) {

	}

	topView(): React.ReactElement {
		return this.state.stack[this.state.stack.length - 1];
	}

	private _initial(content: React.ReactElement<ViewProps>) {
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
	private _animate(content: React.ReactElement<ViewProps>) {
		if (!this.state) {
			return {};
		}
		switch (content.props.transition) {
			case AnyTransition.opacity:
				return { opacity: 1 };
			case AnyTransition.slide:
			default:
				switch (content.props.detent) {
					case Detent.medium:
						return { translateY: this.root_ref.current.clientHeight / 2 };
					case Detent.large:
					default:
						return { translateY: 0 };
				}
		}
	}

	private get shadeView() {
		return <motion.div
			onClick={e => {
				this.dismiss();
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 0.5 }}
			exit={{ opacity: 0 }}
			transition={{
				ease: "easeOut",
			}}
			style={{
				backgroundColor: "black",
				position: "absolute",
				width: "100%",
				height: "100%",
				zIndex: 0,
			}}>
		</motion.div>
	}


	private createView(content: React.ReactElement<ViewProps>) {
		const key = this.state ? this.state.stack.length : 0;
		const initial = this._initial(content);
		const animate = this._animate(content);
		return <div key={key}>
			{this.shadeView}
			<motion.div
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
					overflow: "hidden",
				}}>
				{content}
			</motion.div>
		</div>
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


