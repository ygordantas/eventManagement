import { Route, Routes } from "react-router";
import RegistrationPage from "./pages/Auth/RegistrationPage/RegistrationPage";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import RouteGuard from "./components/RouteGuard";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import MyEventsPage from "./pages/MyEventsPage/MyEventsPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import InboxPage from "./pages/InboxPage/InboxPage";
import MyEventFormPage from "./pages/MyEventsPage/MyEventFormPage/MyEventFormPage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const authRoutes = (
    <Route element={<AuthLayout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegistrationPage />} />
    </Route>
  );

  const protectedRoutes = (
    <Route
      element={
        <ErrorBoundary fallback={"Something went wrong"}>
          <RouteGuard>
            <Layout />
          </RouteGuard>
        </ErrorBoundary>
      }
    >
      <Route index element={<HomePage />} />
      <Route path="friends" element={<FriendsPage />} />
      <Route path="events" element={<EventsPage />} />
      <Route path="inbox" element={<InboxPage />} />

      <Route path="my-events">
        <Route index element={<MyEventsPage />} />
        <Route path="manage/:eventId?" element={<MyEventFormPage />} />
      </Route>
    </Route>
  );
  return (
    <Routes>
      {protectedRoutes}
      {authRoutes}
    </Routes>
  );
}

export default App;
