import React from "react"
import { Property } from "csstype"
import HStack from "./HStack";

export default class UIPageControl extends React.Component<{
	currentPage: number;
	numberOfPages: number;
	pageIndicatorTintColor?: Property.Color;
	currentPageIndicatorTintColor?: Property.Color;
}>{

	render(): React.ReactNode {
		const p = this.props;
		console.log(p.pageIndicatorTintColor)
		const ary = Array.from(Array(p.numberOfPages), (v, k) => k)
		return <HStack spacing={8}>
			{ary.map(x => {
				return <Dot color={p.pageIndicatorTintColor} key={x} selected={false} />
			})}
		</HStack>
	}
}


class Dot extends React.Component<{
	selected: boolean;
	color?: Property.Color;
}>{

	static defaultProps = {
		color: "black",
	}

	render(): React.ReactNode {
		const p = this.props;
		return <div style={{
			width: 8,
			height: 8,
			borderRadius: "50%",
			backgroundColor: p.color,
			opacity: p.selected ? 1 : 0.2,
		}} />
	}
}

