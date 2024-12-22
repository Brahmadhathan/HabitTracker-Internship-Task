import { Target } from "lucide-react";
import { Link } from "react-router-dom";

function HomePageNavbar() {
  return (
    <header className="fixed bg-white border-b border-gray-100 w-full">
      <div className="container mx-auto  py-4 items-center justify-between flex ">
        <div className="flex items-center gap-4 ">
          <Target className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-800">Atomic Tracker</h3>
        </div>
        <div>
          <ul className="flex items-center gap-4 ">
            <li>
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Testimonials
              </a>
            </li>
            <li>
              <Link to={'/signup'}> <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button></Link>
             
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default HomePageNavbar;
