import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Settings from "./pages/Setting";
import Info from "./pages/Info";
const OPTIONS_URL = "http://127.0.0.1:3010/options/1";

function App() {
  const [options, setOptions] = useState({ theme: "pastel", alternative: 0 });

  async function loadOptions() {
    const res = await fetch(OPTIONS_URL);
    if (res.ok) {
      setOptions(await res.json());
    }
  }

  useEffect(() => {
    loadOptions();
  }, []);

  // put the theme on the <html> element, so the CSS can react to it
  useEffect(() => {
    document.documentElement.dataset.theme =
      options.theme === "dark" ? "dark" : "pastel";
  }, [options.theme]);

  async function updateOptions(change) {
    await fetch(OPTIONS_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(change),
    });
    await loadOptions();
  }

  const alternative = Number(options.alternative) === 1;

  return (
    <div>
      <header className="site-header">
        <div className="brand">
          <img src="/mimi-logo.svg" alt="" width="72" height="50" />
          <h2>mimi.tracking</h2>
        </div>
        <div className="nav">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/report">Report</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <NavLink to="/info">Info</NavLink>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard alternative={alternative} />} />
          <Route path="/report" element={<Report />} />
          <Route
            path="/settings"
            element={
              <Settings options={options} updateOptions={updateOptions} />
            }
          />
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
