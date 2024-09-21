import { QueryClient, QueryClientProvider } from "react-query";
import { CricketMatchHomePage } from "./components/CricketMatchHomePage";
import { Format } from "./models/enums/CricketFormat";

import "./i18n";

import "./App.scss";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <CricketMatchHomePage format={Format.ODI} />
    </QueryClientProvider>
  );
};

export default App;
