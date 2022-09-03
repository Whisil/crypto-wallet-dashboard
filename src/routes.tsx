import { Route, Routes } from 'react-router-dom';
import Home from 'src/templates/Home';
import { BrowserRouter as Router } from "react-router-dom";

export const DefaultRoutes = () => {

	return (
		<Router>
			<Routes>
				<Route index element={<Home />} />
				<Route path="*" element={<p>There's nothing here: 404!</p>} />
			</Routes>
		</Router>
	)
}