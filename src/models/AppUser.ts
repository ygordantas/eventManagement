import type UserAuth from "./UserAuth";
import type UserDetails from "./UserDetails";

export default interface AppUser extends UserAuth, UserDetails {}
