import React, { Component, CSSProperties, ReactNode } from 'react'; // ReactとComponentをインポート

class ZStack extends Component<{
	style?: CSSProperties;
	children:any;
}>{
	// renderメソッドを定義する
	render() {
		const { style } = this.props;
		const children = React.Children.toArray(this.props.children);
		return <div style={{ position: 'relative', ...style }}>
			{children.map((child, index) => (
				<div key={index} style={{
					position: 'absolute',
					overflow: "hidden",
					width: "100%",
					height: "100%",
					zIndex: index + 1
				}}>{child}</div>
			))}
		</div>;
	}
}

export default ZStack;