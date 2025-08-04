import SidebarNav from "../../components/SidebarNav/SidebarNav";
import useAuthContext from "../../hooks/useAuthContext";

export default function HomePage() {
  const { loggedUser } = useAuthContext();

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <SidebarNav navItems={[]} footer={`Welcome back, ${loggedUser!.firstName}!`} />
    </div>
  );
}
