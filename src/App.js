import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Symmetric from "./components/Symmetric";
import Asymmetric from "./components/Asymmetric";
import DES from "./components/DES";
import NoPage from "./components/NoPage";

function App() {
  return (
    <HashRouter>
      <Header />
      <Nav />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="symmetric" element={<Symmetric />} />
        <Route path="des" element={<DES />} />
        <Route path="asymmetric" element={<Asymmetric />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
