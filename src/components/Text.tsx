import React, { CSSProperties, ReactNode } from "react";
import { Property } from 'csstype';

export default class Text extends React.Component<{
	lineLimit?: number;
	size?: Property.FontSize<number>;
	color?: Property.Color;
	palt?: boolean;
	bold?: boolean;
	width?: Property.Width<number>;
	monospace?: boolean;
	textAlign?: Property.TextAlign;
	style?: CSSProperties;
	opacity?:number;
	lineHeight?: Property.LineHeight<number>;
	emphasis?: "high" | "mid" | "low";
	underline?:boolean;
	weight?:Property.FontWeight;
	onClick?:Function;
	maxLines?:number;
	children:ReactNode;
}>{
	render() {
		const p = this.props;
		let style: CSSProperties = {
			fontSize: p.size,
			color: p.color,
			width: p.width,
			textAlign: p.textAlign,
		}
		if (p.palt) {
			style.fontFeatureSettings = `"palt"`;
		}
		if( p.weight ){
			style.fontWeight = p.weight;
		}
		if (p.bold) {
			style.fontWeight = 600;
		}
		if (p.lineLimit == 1) {
			style.overflow = "hidden";
			style.textOverflow = "ellipsis";
			style.whiteSpace = "nowrap";
		}
		if (p.monospace) {
			style.fontFamily = "monospace";
		}
		if(p.opacity){
			style.opacity = p.opacity;
		}
		if (p.lineHeight) {
			style.lineHeight = p.lineHeight;
		}
		if( p.emphasis ){
			style.color = `var(--${p.emphasis}-emphasis)`;
		}
		if( p.underline){
			style.borderBottom = "solid 0.5px var(--low-emphasis)";
			style.paddingBottom = 2;
		}
		if( p.maxLines ){
			style.display = "-webkit-box";
			style.overflow = "hidden"
			style.WebkitLineClamp = p.maxLines;
			style.WebkitBoxOrient = "vertical"
		}

		if (p.style) {
			style = Object.assign(style, p.style);
		}
		return <div style={style} onClick={x=>{
			if( p.onClick ){
				p.onClick();
			}
		}}>{p.children}</div>
	}
}


