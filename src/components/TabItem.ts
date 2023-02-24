export default class TabItem {
	readonly title: string;
	readonly icon: string;
	readonly content: any;
	constructor(title: string, icon: string, content: any) {
		this.title = title;
		this.icon = icon;
		this.content = content;
	}
}