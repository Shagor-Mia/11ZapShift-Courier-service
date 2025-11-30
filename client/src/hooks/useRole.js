import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const { isLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
  });
  return { isLoading, role };
};
export default useRole;
