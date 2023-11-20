import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tinders, setTinders] = useState([]);

  useEffect(() => {
    const fetchIt = async () => {
      let hr = await fetch(`${import.meta.env.VITE_API_URL}/api/treffit`);
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
