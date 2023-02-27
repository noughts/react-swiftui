/*

HOW TO USE

static contextType = NavigationContext;
declare context: React.ContextType<typeof NavigationContext>;

*/

import React from "react"
import { Detent } from "./ViewProps";
type SceneContextType = {
	testString?: string;
	present?: (content: React.ReactElement) => void;
	setDetent?: (detent: Detent) => void;
	dismiss?: Function;
}
type NavigationContextType = {
	push?: (content: React.ReactElement) => void;
	pop?: Function;
}
export const SceneContext = React.createContext<SceneContextType>({});
export const NavigationContext = React.createContext<NavigationContextType>({});