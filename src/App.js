import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import Test from "./pages/Test/Test";
import Result from "./components/Result/Result";

function App() {
    return (
        <div className="app">
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
