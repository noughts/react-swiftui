import React, { CSSProperties } from "react"
import { Property } from "csstype"
import HStack from "./HStack";

export class UIPageControl extends React.Component<{
	currentPage: number;
	numberOfPages: number;
	pageIndicatorTintColor?: Property.Color;
	currentPageIndicatorTintColor?: Property.Color;
	style?: CSSProperties;
}>{

	render(): React.ReactNode {
		const p = this.props;
		const ary = Array.from(Array(p.numberOfPages), (v, k) => k)
		return <HStack spacing={8} style={{ width: "100%", ...p.style }} justifyContent="center">
			{ary.map((x, i) => {
				const selected = i == p.currentPage;
				return <Dot color={p.pageIndicatorTintColor} key={x} selected={selected} />
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

