import React from "react"
import { Routes, Route } from "react-router-dom"

import { ROOT } from "./constants"
import Home from "../pages/Home"

function RouteConfig() {
	return (
		<Routes>
			<Route exact path={ROOT} element={<Home />} />
		</Routes>
	)
}

export default RouteConfig
