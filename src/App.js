import { BrowserRouter } from "react-router-dom"
import "./App.css"
import RouteConfig from "./navigation/RouteConfig"

function App() {
	return (
		<BrowserRouter>
			<RouteConfig></RouteConfig>
		</BrowserRouter>
	)
}

export default App
