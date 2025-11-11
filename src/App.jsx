import { BrowserRouter, Routes, Route } from "react-router-dom"; // imported new routing library for form submission
import "./App.css";
import ContactSplitPane from "./ContactSplitPane";
import AddContact from "./AddContact"; // new file page
import "./ContactSplitPane.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ContactSplitPane />} />
                <Route path="/new" element={<AddContact />} />
            </Routes>
        </BrowserRouter>
    );
}
