import { defineFunction } from "@aws-amplify/backend";

export const usersAPI = defineFunction({
  name: "getUser",
  entry: "./getUser.ts",
  timeoutSeconds: 20,
  memoryMB: 512,
});
