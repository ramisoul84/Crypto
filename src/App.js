import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Nav from "./components/Nav.js";
import Home from "./components/Home.js";
import Symmetric from "./components/Symmetric.js";
import Asymmetric from "./components/Asymmetric.js";
import DES from "./components/DES.js";
import AES from "./components/AES.js";
import Conv from "./components/Conv.js";
import NoPage from "./components/NoPage.js";

function App() {
  return (
    <HashRouter>
      <Header />
      <Nav />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="symmetric" element={<Symmetric />} />
        <Route path="des" element={<DES />} />
        <Route path="aes" element={<AES />} />
        <Route path="asymmetric" element={<Asymmetric />} />
        <Route path="conv" element={<Conv />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
