/*

<PageView>
	<Content1 />
	<Content2 />
]} />

*/

import React, { CSSProperties } from "react";


export default class PageView extends React.Component<{
	page?: number;
	style?: CSSProperties;
	children;
	onPageChanged?: (page: number) => void;
}, {
	currentPageId: number;
}>{

	scrollToPageTimeout: number;
	pages_ref = React.createRef<HTMLDivElement>();
	scrolling = false;

	constructor(props) {
		super(props);
		this.state = {
			currentPageId: props.page,
		}
	}

	async componentDidMount() {
		this.scrollToPage(this.props.page, false);
	}


	scrollToPage(page: number, animated: boolean = true) {
		clearInterval(this.scrollToPageTimeout);

		const page_elm = document.getElementById(`page${page}`);
		if (!page_elm) {
			return;
		}
		if (animated) {
			this.scrolling = true;
			this.pages_ref.current.scrollTo({
				left: page_elm.offsetLeft,
				behavior: "smooth"
			})
			this.scrollToPageTimeout = setTimeout(x => {
				this.scrolling = false;
			}, 500)
		} else {
			this.pages_ref.current.scrollLeft = page_elm.offsetLeft
		}

	}

	render() {
		const p = this.props;
		const contents: any[] = this.props.children as any[];
		return <div className="PageView" style={{
			height: "100%",
			display: "flex",
			justifyContent: "stretch",
			overflowY: "scroll",
			flexDirection: "column",
			...p.style
		}}>
			<div className="__react_swiftui_pageView_container" style={{
				flexGrow: 2,
				display: "flex",
				width: "100%",
				overflowX: "scroll",
				overflowY: "hidden",
				scrollSnapType: "x mandatory",
				gap: 0,
				scrollBehavior: "auto",
			}} ref={this.pages_ref}>
				{contents.map((x, index) => {
					return <Page page={index} key={index} snapEnabled={true} onVisible={e => {
						if (this.scrolling == false) {
							this.setState({ currentPageId: index });
						}
						if (p.onPageChanged) {
							p.onPageChanged(index);
						}
					}}>{x}</Page>
				})}
			</div>

			<style>{`
				.__react_swiftui_pageView_container::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	}
}









class Page extends React.Component<{
	page: number;
	snapEnabled: boolean;
	onVisible: Function;
	children;
}>{

	root_ref = React.createRef<HTMLDivElement>();
	observer: IntersectionObserver;

	constructor(p) {
		super(p);
		this.handleIntersect = this.handleIntersect.bind(this);
	}

	componentDidMount(): void {
		this.observer = new IntersectionObserver(this.handleIntersect, {
			root: null,
			rootMargin: "0px",
			threshold: [0.66]
		});
		this.observer.observe(this.root_ref.current);
	}
	componentWillUnmount(): void {
		this.observer.unobserve(this.root_ref.current);
	}


	handleIntersect(entries: IntersectionObserverEntry[], observer) {
		entries.forEach(x => {
			if (x.isIntersecting == false) {
				return;
			}
			this.props.onVisible();
		})
	}


	render() {
		return <div
			style={{
				flexShrink: 0,
				width: "100%",
				scrollSnapAlign: "center",
				scrollSnapStop: "always",
				overflowY: "scroll"
			}}
			ref={this.root_ref}
			id={`page${this.props.page}`}
			className="Page">
			{this.props.children}
		</div>
	}
}