export default class NavigationEvent extends Event {

	readonly destination: React.ReactNode;
	readonly transition: "slide" | "fade";

	constructor(type: "push" | "present" | "dismiss", destination: React.ReactNode = null, transition: "slide" | "fade" = "slide") {
		super(type);
		this.destination = destination;
		this.transition = transition;
	}
}