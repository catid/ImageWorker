import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocketContext, socket } from "./socket";
import PromptScreen from "./PromptScreen";

const App: React.FC = () => {
  return (
    <SocketContext.Provider value={socket}>
      <PromptScreen />
    </SocketContext.Provider>
  );
};

export default App;
