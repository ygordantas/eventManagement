import { Route, Routes } from "react-router";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import Layout from "./components/Layout/Layout";
import RouteGuard from "./components/RouteGuard";
import EventFormPage from "./pages/EventFormPage/EventFormPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import HomePage from "./pages/HomePage/HomePage";
import InboxPage from "./pages/InboxPage/InboxPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyEventsPage from "./pages/MyEventsPage/MyEventsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  return (
    <Routes>
      <Route
        element={
          <RouteGuard>
            <Layout />
          </RouteGuard>
        }>
        <Route index element={<HomePage />} />
        <Route path='events' element={<EventsPage />} />
        <Route path='friends' element={<FriendsPage />} />
        <Route path='inbox' element={<InboxPage />} />

        <Route path='my-events'>
          <Route index element={<MyEventsPage />} />
          <Route path='manage/:eventId?' element={<EventFormPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
