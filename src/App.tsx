import { ExternalLinkIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Status } from "./components/Status";
import { useDarkMode } from "./hooks/useDarkMode";

const CAN_CONNECT = false;

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="p-5 flex justify-center">
      <main className="flex flex-col items-start gap-5  w-screen lg:w-[1024px]">
        <section
          className={`w-full items-center gap-2 header-grid-mobile sm:header-grid-desktop`}
        >
          <a
            href="https://web3pi.io"
            target="_blank"
            className="[grid-area:logo]"
          >
            <img
              src={darkMode ? "web3pi_white.svg" : "web3pi.svg"}
              className="h-12"
              alt="web3pi logo"
            />
          </a>
          <Button disabled={!CAN_CONNECT} className="[grid-area:grafana]">
            {CAN_CONNECT ? "Grafana" : "Grafana not available"}
            <ExternalLinkIcon />
          </Button>
          <Button disabled={!CAN_CONNECT} className="[grid-area:json-api]">
            {CAN_CONNECT ? "JSON API" : "JSON API not available"}
            <ExternalLinkIcon />
          </Button>
          <Button onClick={toggleDarkMode} className="[grid-area:dark-mode]">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
        </section>
        <Status />
      </main>
    </div>
  );
}

export default App;
