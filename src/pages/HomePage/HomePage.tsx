import type LoggedUser from "../../models/LoggedUser";

type HomePageProps = {
  loggedUser: LoggedUser;
};
export default function HomePage({ loggedUser }: HomePageProps) {
  return (
    <div>
      Hello, {loggedUser.firstName} {loggedUser.lastName}
    </div>
  );
}
