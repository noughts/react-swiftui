import React, { CSSProperties } from "react";
import NavigationEvent from "./NavigationEvent";
import { AnimatePresence, motion } from "framer-motion"

export default class Root extends React.Component<{
	style?: CSSProperties;
	children?: any;
}, {
	stack: any[];
}>{

	root_ref = React.createRef<HTMLDivElement>();

	constructor(p) {
		super(p);
		this.state = {
			stack: [],
		}
		this.onPushLinkClick = this.onPushLinkClick.bind(this);
		this.onPopLinkClick = this.onPopLinkClick.bind(this);
	}

	show(){
		alert("show");
	}

	componentDidMount() {
		addEventListener("present", this.onPushLinkClick);
		addEventListener("dismiss", this.onPopLinkClick);
	}

	componentWillUnmount() {
		removeEventListener("present", this.onPushLinkClick);
		removeEventListener("dismiss", this.onPopLinkClick);
	}

	onPushLinkClick(e: NavigationEvent) {
		const newAry = this.state.stack;
		const newPage = this.createPageView(e.destination, e.transition);
		newAry.push(newPage);
		this.setState({ stack: newAry })
	}
	onPopLinkClick(e: NavigationEvent) {
		const newAry = this.state.stack;
		newAry.pop();
		this.setState({ stack: newAry })
	}

	createPageView(content: any, transition: "slide" | "fade") {
		const initY = this.root_ref.current?.clientHeight;
		const key = this.state.stack.length + 1;

		const initial = transition == "slide" ? { translateY: initY } : { opacity: 0 }
		const animate = transition == "slide" ? { translateY: 0 } : { opacity: 1 }
		return <motion.div
			key={key}
			initial={initial}
			animate={animate}
			exit={initial}
			transition={{
				ease: "easeOut"
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
			<div style={{
				width: "100%",
				height: "100%",
				position: "absolute",
				zIndex: 0
			}}>
				{React.cloneElement(p.children, {show:this.show})}
			</div>
			{/* AnimatePresenceによって、exit アニメーションを有効に出来ます */}
			<AnimatePresence>
				{this.state.stack.map(x => {
					return x;
				})}
			</AnimatePresence>
		</div>
	}
}


