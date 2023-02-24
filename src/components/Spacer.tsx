import React, { CSSProperties } from "react";


export default class Spacer extends React.Component<{
	minLength?:number;
}>{
	render() {
		const p = this.props;
		const style:CSSProperties = {
			flexGrow:100,
		}
		if( p.minLength ){
			style.minWidth = p.minLength;
			style.minHeight = p.minLength
		}
		return <div style={style} />
	}
}


