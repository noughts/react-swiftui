import { motion } from "framer-motion";
import React, { CSSProperties } from "react";
import NavigationEvent from "./NavigationEvent";

export default class NavigationView extends React.Component<{
	style?: CSSProperties;
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
		this.onPushLinkClick = this.onPushLinkClick.bind(this);
		this.onPopLinkClick = this.onPopLinkClick.bind(this);
	}

	componentDidMount() {
		addEventListener("push", this.onPushLinkClick);
		addEventListener("pop", this.onPopLinkClick);
	}

	componentWillUnmount() {
		removeEventListener("push", this.onPushLinkClick);
		removeEventListener("pop", this.onPopLinkClick);
	}

	onPushLinkClick(e: NavigationEvent) {
		const newAry = this.state.stack;
		const newPage = this.createPageView(e.destination);
		newAry.push(newPage);
		this.setState({ stack: newAry })
	}
	onPopLinkClick(e: NavigationEvent) {
		console.log(e)
	}

	createPageView(content: any) {
		let initX = 0;
		if( this.root_ref.current ){
			initX = this.root_ref.current.clientWidth;
		}
		const key = this.state ? this.state.stack.length : 0;
		return <motion.div
			key={key}
			animate={{
				x: 0,
			}}
			initial={{
				x: initX,
			}}
			transition={{
				ease:"easeOut"
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
			position:"relative",
			width:"100%",
			height:"100%",
		};
		if (p.style) {
			style = Object.assign(style, p.style);
		}

		return <div ref={this.root_ref} className="NavigationView" style={style}>
			{this.state.stack.map(x => {
				return x;
			})}
		</div>
	}
}


