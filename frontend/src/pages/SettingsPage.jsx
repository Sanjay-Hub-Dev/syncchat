import { Link } from "react-router-dom";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Theme Settings</h1>
          <Link to="/" className="btn btn-outline btn-sm">
            Back to Chat
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-xl border text-left overflow-hidden ${
                theme === t ? "border-primary border-2" : "border-base-300"
              }`}
            >
              <div data-theme={t} className="p-3 bg-base-100">
                <div className="font-semibold capitalize mb-2 text-base-content">{t}</div>

                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-primary"></div>
                  <div className="w-6 h-6 rounded bg-secondary"></div>
                  <div className="w-6 h-6 rounded bg-accent"></div>
                  <div className="w-6 h-6 rounded bg-neutral"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;