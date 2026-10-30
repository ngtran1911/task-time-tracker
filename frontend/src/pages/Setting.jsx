function Settings({ options, updateOptions }) {
  const dark = options.theme === "dark";
  const alternative = Number(options.alternative) === 1;

  return (
    <div>
      <h1>Settings</h1>

      <section className="panel">
        <h2>Theme</h2>
        <label>
          <input
            type="radio"
            name="theme"
            checked={!dark}
            onChange={() => updateOptions({ theme: "pastel" })}
          />
          Pastel
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            checked={dark}
            onChange={() => updateOptions({ theme: "dark" })}
          />
          Dark
        </label>
      </section>

      <section className="panel">
        <h2>Mode</h2>
        <label>
          <input
            type="checkbox"
            checked={alternative}
            onChange={(e) =>
              updateOptions({ alternative: e.target.checked ? 1 : 0 })
            }
          />
          Only one task can be active at a time
        </label>
        <p>
          When this is on, starting a task stops every other task. Turning it on
          does not stop anything by itself.
        </p>
      </section>
    </div>
  );
}

export default Settings;
