import Provider from "@/providers";
import RouteRenderer from "./routes/route-renderer";

function App() {
	return (
		<Provider>
			<RouteRenderer />
		</Provider>
	);
}

export default App;
