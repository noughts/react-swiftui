import React, { ReactNode } from "react"

export enum AnyTransition{
	opacity,
	slide,
}

export enum Detent {
	medium,
	large,
}

export interface ViewProps {
	// transition?:AnyTransition;
	// detent?:Detent;
	// navigationItem?:NavigationItem;
	rightBarButtonItem?:ReactNode;
	leftBarButtonItem?:ReactNode;
}

// export class NavigationItem{
// 	rightItem?:ReactNode;
// 	leftItem?:ReactNode;
// }