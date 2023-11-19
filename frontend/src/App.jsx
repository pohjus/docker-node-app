import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tinders, setTinders] = useState([]);

  useEffect(() => {
    const fetchIt = async () => {
      let hr = await fetch("/api/treffit");
      let data = await hr.json();
      setTinders(data);
    };
    fetchIt();
  }, []);

  let ui = tinders.map((tinder) => (
    <li key={tinder.id}>{tinder.nimimerkki}</li>
  ));
  return <ul>{ui}</ul>;
}

export default App;
