import { useSelector } from "react-redux";
import "./App.css";
import ContactDetails from "./Pages_Components/ContactDetails";
import ContactList from "./Pages_Components/ContactListPage";
import CreateContacts from "./Pages_Components/CreateContact";
import EditContact from "./Pages_Components/EditContacts";
import Footer from "./Pages_Components/Footer";
import HomePage from "./Pages_Components/HomePage";
import PageNotFound from "./Pages_Components/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { userSelector } from "./reduxFiles/selectors";

// We want to protect some routes, so only logged in users can access those routes
const PrivateRoute = () => {
  let user = useSelector(userSelector);

  // So if we have a user we return the JSX of the nested route, else we navigate to the home page
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/create" element={<PrivateRoute />}>
            <Route path="/create" element={<CreateContacts />} />
          </Route>

          <Route path="/contacts" element={<PrivateRoute />}>
            <Route path="/contacts" element={<ContactList />} />
          </Route>

          <Route path="/contactdetails/:contactID" element={<PrivateRoute />}>
            <Route
              path="/contactdetails/:contactID"
              element={<ContactDetails />}
            />
          </Route>

          <Route path="/edit/:contactID" element={<PrivateRoute />}>
            <Route path="/edit/:contactID" element={<EditContact />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
