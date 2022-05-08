import { Transactions, Welcome } from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Welcome />
      </div>
      <Transactions />
    </div>
  );
};

export default App;
