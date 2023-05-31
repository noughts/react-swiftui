import React, { CSSProperties } from "react";
import VStack from "./VStack";
import Text from "./Text";


export default class LoadingView extends React.Component<{
	message: string;
}>{
	render() {
		return <VStack alignment="center" justifyContent="center"
			style={{
				position: "absolute",
				inset: 0,
				backgroundColor: "rgb(0 0 0 / 50%)"
			}}>
			<Text color="white" bold size={15}>{this.props.message}</Text>
		</VStack>
	}
}


