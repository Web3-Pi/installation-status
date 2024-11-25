import { ExternalLinkIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Status } from "./Status";

const CAN_CONNECT = false;

function App() {
  return (
    <div className="p-12 flex justify-center">
      <main className="flex flex-col items-start gap-5  w-screen lg:w-[1024px]">
        <section className="flex w-full justify-between items-start">
          <a href="https://web3pi.io" target="_blank">
            <img src="web3pi.svg" className="h-12" alt="web3pi logo" />
          </a>
          <div className="flex gap-2 flex-col md:flex-row">
            <Button disabled={!CAN_CONNECT}>
              {CAN_CONNECT ? "Grafana" : "Grafana not available"}
              <ExternalLinkIcon />
            </Button>
            <Button disabled={!CAN_CONNECT}>
              {CAN_CONNECT ? "JSON API" : "JSON API not available"}
              <ExternalLinkIcon />
            </Button>
          </div>
        </section>
        <Status />
      </main>
    </div>
  );
}

export default App;
