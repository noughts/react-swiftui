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
	detent?:Detent;
	title?:string;
	rightBarButtonItem?:ReactNode;
	leftBarButtonItem?:ReactNode;
}
