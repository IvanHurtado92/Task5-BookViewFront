import { BooksPage } from "./components/BooksPage/BooksPage";
import "./App.css"

function App() {
  return (
    <div className="min-h-screen p-6 main">
      <h1 className="text-3xl font-bold mb-6 text-center">Books Library</h1>
      <BooksPage />
    </div>
  );
}

export default App;

