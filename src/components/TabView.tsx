/*

<TabView items={[
	new TabItem("タブ1", "/images/gnb/home.svg", <Page1 />),
	new TabItem("タブ2", "/images/gnb/weather.svg", <Page2 />),
]} />

*/

import React, { CSSProperties } from "react";
import HStack from "./HStack";
import TabItem from "./TabItem";
import VStack from "./VStack";

export default class TabView extends React.Component<{
	items: TabItem[],
}, {
	selectedIndex: number;
}>{

	constructor(p) {
		super(p);
		this.state = {
			selectedIndex: 0,
		}
	}


	render() {
		const selectedItem = this.props.items[this.state.selectedIndex];
		return <VStack alignment={"stretch"} style={{
			height: "calc(var(--vh, 1vh) * 100)",
		}}>
			<div style={{
				flexGrow: 2,
				overflow: "hidden"
			}}>
				{selectedItem.content}
			</div>
			<TabBar
				items={this.props.items}
				selectedIndex={this.state.selectedIndex}
				onClick={e => {
					this.setState({ selectedIndex: e });
				}} />
		</VStack>
	}
}





class TabBar extends React.Component<{
	items: TabItem[];
	selectedIndex: number;
	onClick: Function;
}>{
	render(): React.ReactNode {
		return <HStack justifyContent={"space-between"} style={{
			height: 49,
			flexShrink: 0,
			backgroundColor: "var(--tab-bar-bg)",
			borderTop: "solid 0.5px var(--separator)",
		}}>
			{this.props.items.map((item, index) => {
				const selected = index == this.props.selectedIndex;
				return <TabBarButton key={index} item={item} index={index} selected={selected} onClick={e => {
					this.props.onClick(index);
				}} />
			})}
		</HStack>
	}
}


class TabBarButton extends React.Component<{
	item: TabItem;
	index: number;
	onClick: Function;
	selected: boolean;
}>{
	render(): React.ReactNode {
		const item = this.props.item;
		return <>
			<VStack alignment={"center"} style={{
				width: "100%",// 均等割付け
			}} onClick={e => {
				this.props.onClick(this.props.index);
			}}>
				<img className="icon" src={item.icon} style={{
					width: 32,
					height: 32,
					objectFit: "contain",
					filter: `saturate(${this.props.selected ? 1 : 0})`
				}} />
				<div className="title" style={{
					fontSize: 10,
					width: "100%",
					textAlign: "center",
					fontWeight: "bold",
					color: this.props.selected ? "var(--key-color)" : "#999999",
					textOverflow:"ellipsis",
					whiteSpace:"nowrap",
					overflow:"hidden"
				}}>{item.title}</div>
			</VStack>
		</>
	}
}