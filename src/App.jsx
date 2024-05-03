import "./App.css";
import ContactDetails from "./Pages_Components/ContactDetails";
import ContactList from "./Pages_Components/ContactListPage";
import CreateContacts from "./Pages_Components/CreateContact";
import EditContact from "./Pages_Components/EditContacts";
import Footer from "./Pages_Components/Footer";
import HomePage from "./Pages_Components/HomePage";
import PageNotFound from "./Pages_Components/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateContacts />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route
            path="/contactdetails/:articleID"
            element={<ContactDetails />}
          />
          <Route path="/edit/:articleID" element={<EditContact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
