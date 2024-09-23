import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./users.endpoints";

const useGetUsers = () => useQuery({
  queryKey: ["dashboard", "users"],
  queryFn: getUsers,
});

export { useGetUsers };
