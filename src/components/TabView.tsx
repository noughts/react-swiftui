/*

<TabView items={[
	new TabItem("タブ1", "/images/gnb/home.svg", <Page1 />),
	new TabItem("タブ2", "/images/gnb/weather.svg", <Page2 />),
]} />

*/

import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import HStack from "./HStack";
import TabItem from "./TabItem";
import VStack from "./VStack";



export const TabView: React.FC<{ items: TabItem[], children: ReactNode }> = ({ items, children }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	return <div className="TabView" style={{ zIndex: 1, position: "relative" }}>
		<VStack alignment={"stretch"} style={{
			height: "calc(var(--vh, 1vh) * 100)",
		}}>
			{items.map((x, i) => {
				const display = i == selectedIndex ? "block" : "none";
				return <div key={i} style={{ flexGrow: 2, overflow: "hidden", display }}>{x.content}</div>
			})}

			<TabBar
				items={items}
				selectedIndex={selectedIndex}
				onClick={e => {
					setSelectedIndex(e);
				}} />
		</VStack>
		{children}
	</div>
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
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					overflow: "hidden"
				}}>{item.title}</div>
			</VStack>
		</>
	}
}