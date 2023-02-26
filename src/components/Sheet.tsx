import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react"
import { Detent, AnyTransition } from "./ViewProps";


export class Sheet extends React.Component<{
	children: ReactNode;
	isPresented: boolean;
	onClickShadeView: Function;
	detent?: Detent;
	transition?: AnyTransition;
}, {
	windowHeight: number;
}>{

	constructor(p) {
		super(p);
		this.state = {
			windowHeight: 0,
		}
	}

	static defaultProps = {
		transition: AnyTransition.slide,
		detent: Detent.large,
	}

	componentDidMount(): void {
		this.setState({ windowHeight: window.innerHeight });
	}

	private get shadeView() {
		const p = this.props;
		return <motion.div
			onClick={e => {
				p.onClickShadeView();
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

	private get _height(){
		const p = this.props;
		switch (p.detent) {
			case Detent.medium:
				return "50%";
			case Detent.large:
			default:
				return "100%"
		}
	}
	private get _initial() {
		const p = this.props;
		switch (p.transition) {
			case AnyTransition.opacity:
				return { opacity: 0 };
			case AnyTransition.slide:
			default:
				return { translateY: this.state.windowHeight, height:this._height };

		}
	}
	private get _animate() {
		const p = this.props;
		switch (p.transition) {
			case AnyTransition.opacity:
				return { opacity: 1 };
			case AnyTransition.slide:
			default:
				switch (p.detent) {
					case Detent.medium:
						return {
							translateY: this.state.windowHeight / 2,
							height: this._height,
						};
					case Detent.large:
					default:
						return {
							translateY: 0,
							height: this._height,
						};
				}
		}
	}

	render(): React.ReactNode {
		const p = this.props;
		const initial = this._initial;
		const animate = this._animate;
		return <AnimatePresence>
			{p.isPresented &&
				<div style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					zIndex:100,
				}}>
					{this.shadeView}
					<motion.div
						initial={initial}
						animate={animate}
						exit={initial}
						transition={{
							ease: "easeOut",
						}}
						style={{
							position: "absolute",
							width: "100%",
							overflow: "hidden",
							zIndex: 0,
						}}>{p.children}
					</motion.div>
				</div>
			}
		</AnimatePresence>
	}
}