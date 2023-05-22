import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AnyTransition, Detent, ViewProps } from "./ViewProps";


export const SceneContext = React.createContext<{
	present?: (content: React.ReactElement) => void;
	changeDetent?: (detent: Detent) => void;
	dismiss?: Function;
}>(null);


export class Scene extends React.Component<{
	children?: React.ReactElement<ViewProps>;
}, {
	stack: React.ReactElement<ViewProps>[];
	detent: Detent;
	windowHeight: number;
}>{

	constructor(p) {
		super(p);
		this.state = {
			stack: [],
			detent: Detent.large,
			windowHeight: 0,
		}
		this.onWindowResized = this.onWindowResized.bind(this);
		this.present = this.present.bind(this);
		this.dismiss = this.dismiss.bind(this);
		this.changeDetent = this.changeDetent.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.onWindowResized);
		this.onWindowResized();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResized);
	}

	onWindowResized() {
		this.setState({ windowHeight: window.innerHeight });
	}

	present(view: React.ReactElement<ViewProps>) {
		const newAry = this.state.stack;
		newAry.push(view);
		this.setState({ stack: newAry, detent: view.props.detent })
	}
	dismiss() {
		const newAry = this.state.stack;
		newAry.pop();
		this.setState({ stack: newAry })
	}
	changeDetent(detent: Detent) {
		this.setState({ detent: detent });
	}

	get topView(): React.ReactElement<ViewProps> {
		return this.state.stack[this.state.stack.length - 1];
	}


	render() {
		const p = this.props;
		const s = this.state;
		return <div className="Scene" style={{
			position: "relative",
			width: "100%",
			height: "100%",
			zIndex: 1,// スタッキングコンテキスト作成
		}}>
			<SceneContext.Provider value={{
				present: this.present,
				dismiss: this.dismiss,
				changeDetent: this.changeDetent,
			}}>
				{p.children}
				{/* AnimatePresenceによって、exit アニメーションを有効に出来ます */}
				<AnimatePresence>
					{this.state.stack.map((x, i) => {
						return <View
							key={i}
							detent={s.detent}
							windowHeight={s.windowHeight}>
							{x}</View>;
					})}
				</AnimatePresence>
			</SceneContext.Provider>
		</div>
	}
}


class View extends React.Component<{
	children;
	windowHeight: number;
	detent?: Detent;
	transition?: AnyTransition;
}>{


	private get _height() {
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
				return { translateY: p.windowHeight, height: this._height };

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
							translateY: p.windowHeight / 2,
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
		const initial = this._initial;
		const animate = this._animate;
		const radius = this.props.detent == Detent.large ? 0 : 8;
		return <div className="Scene_View" style={{
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			zIndex: 1,// スタッキングコンテキスト作成
		}}>
			<ShadeView />
			<motion.div
				animate={animate}
				initial={initial}
				exit={initial}
				transition={{
					ease: "easeOut"
				}}
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					borderRadius: `${radius}px ${radius}px 0 0`,
					overflow: "hidden",
				}}>
				{this.props.children}
			</motion.div>
		</div>
	}
}

class ShadeView extends React.Component {

	static contextType = SceneContext;
	declare context: React.ContextType<typeof SceneContext>;

	render(): React.ReactNode {
		const p = this.props;
		return <motion.div
			className="ShadeView"
			onClick={e => {
				this.context.dismiss();
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
			}}>
		</motion.div>
	}
}


