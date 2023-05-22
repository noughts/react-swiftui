import React, { ReactNode } from "react"
import { NavigationItem } from "./NavigationView";

export enum AnyTransition {
	opacity,
	slide,
}

export enum Detent {
	medium,
	large,
}

export interface ViewProps {
	// transition?:AnyTransition;
	detent?: Detent;
	navigationBarHidden?: boolean;
}
