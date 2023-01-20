import { useState, useEffect } from "react";

import { accessToken } from "./spotify";

import { Login, Top, Footer } from "./components";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, [token]);

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <>
          <Top />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
