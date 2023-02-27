import Head from 'next/head'
import React from "react"
import '../styles/globals.css'





export default class MyApp extends React.Component<{
	Component, pageProps
}>{

	componentDidMount() {
		// console.log(moment())
		window.addEventListener('resize', this.onWindowResized);
		this.onWindowResized();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResized);
	}

	onWindowResized() {
		// CSS 用のプロパティ「--vh」を、URLバーやツールバーを除いた高さで更新する。
		// これによって、height を calc(var(--vh, 1vh) * 100) のように利用できます
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}


	render() {
		// PCレイアウトが指定されていれば、モバイル用のレイアウトを使用せずにレンダリング
		if (this.props.Component["layout"] == "pc") {
			return <this.props.Component {...this.props.pageProps} />
		}

		return <>
			<Head>
				<title>SmartNews</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
				<meta name="apple-mobile-web-app-capable" content="yes"></meta>
			</Head>
			<div className="app">
				<this.props.Component {...this.props.pageProps} />
			</div>

			<style jsx>{`
				.app{
					width: 100%;
					height:100%;
					max-width: 480px;
					margin-left: auto;
					margin-right: auto;
					background-color:var(--bg-color);
				}
			`}</style>
		</>
	}
}

