
import { UIPageControl } from "@/components/UIPageControl";
import React from "react"
import { HStack, PageView, ScrollView, VStack } from ".."

export default class CarouselDemo extends React.Component{


	render(): React.ReactNode {
		const arr = new Array(10).fill(0).map((_, index) => index);
		return <VStack padding={16}>
			<ScrollView axis="horizontal" negativeMargin={16} scrollBarHidden>
				<HStack spacing={8}>
					{arr.map(x=>{
						return <Cell key={x} />
					})}
				</HStack>
			</ScrollView>

		</VStack>
	}
}




class Cell extends React.Component {
	render(){
		return <div style={{backgroundColor:"green", width:44, height:44, borderRadius:22, flexShrink:0}}></div>
	}
}
