import { PropsWithChildren, createContext } from "react";

import { type User } from "@/lib/server-authentication";

const emptyUser = {};
export const UserContext = createContext<User>(emptyUser);

type Props = {
	initialUser: User;
};

export const UserProvider = ({
	children,
	initialUser,
}: PropsWithChildren<Props>) => {
	return (
		<UserContext.Provider value={initialUser}>{children}</UserContext.Provider>
	);
};
