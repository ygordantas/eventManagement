// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomePage({ loggedUser }: any) {
  return (
    <div>
      Hello {loggedUser.firstName} {loggedUser.lastName}
    </div>
  );
}
