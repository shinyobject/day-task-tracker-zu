import { AppProvider } from "./context/AppContext";
import { TaskTracker } from "./components/TaskTracker";

function App() {
  return (
    <AppProvider>
      <TaskTracker />
    </AppProvider>
  );
}

export default App;
