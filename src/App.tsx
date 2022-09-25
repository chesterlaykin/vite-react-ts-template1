import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { About } from "@/pages/About";
import { Home } from "@/pages/Home";
import { Thing } from "@/pages/Thing";

function App() {
  const [count, setCount] = useState<number>(0);
  const [thing, setThings] = useState<any[]>([]);
  const [links, setLinks] = useState([
    {url: '/', title: 'Home'},
    {url: '/About', title: 'About'},
    {url: '/thing', title: 'Thing'},
  ]);

  return (
    <>
    <nav className="ul">
      {links.map( link => <li><Link to={link.url}>{link.title}</Link></li>)}
    </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/thing" element={<Thing />} />
      </Routes>
    </>
  );
}

export default App;
