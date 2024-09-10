import envVariables from "./constants/envVariables.js"
import "./App.css";

function App() {
  return (
    <>
      <h1>Welcome to the...</h1>
      <h2>{import.meta.env.VITE_CONSTANT ?? `Could not fetch Vite-constant`}</h2>
      <h2>{import.meta.env.RANDOM_CONSTANT ?? `Could not fetch Random-constant!`}</h2>

      <h1>Env</h1>
      <h2>{envVariables.appwriteURL}</h2>
      <h2>{envVariables.appwriteProjectId}</h2>
      <h2>{envVariables.appwriteDatabaseId}</h2>
      <h2>{envVariables.appwriteCollectionId}</h2>
      <h2>{envVariables.appwriteBucketId}</h2>
    </>
  );
}

export default App;
