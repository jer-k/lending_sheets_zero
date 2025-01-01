import { createSchema, definePermissions } from "@rocicorp/zero";

const messageSchema = {
	tableName: "message",
	columns: {
		id: "string",
		senderID: "string",
		mediumID: "string",
		body: "string",
		timestamp: "number",
	},
	primaryKey: "id",
	relationships: {
		sender: {
			sourceField: "senderID",
			destSchema: () => userSchema,
			destField: "id",
		},
	},
} as const;

const userSchema = {
	tableName: "users",
	columns: {
		id: "string",
		name: "string",
		partner: "boolean",
	},
	primaryKey: "id",
} as const;

export const schema = createSchema({
	version: 1,
	tables: {
		message: messageSchema,
		users: userSchema,
	},
});

export type Schema = typeof schema;

type AuthData = {
	// The logged-in user.
	sub: string;
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
	return {};
});
