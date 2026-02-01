import Navbar from "./Components/Navbar";
import Manager from "./Components/Manager";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <Navbar />
      <main className="flex-grow">
        <Manager />
      </main>
      <Footer />
    </div>
  );
}
