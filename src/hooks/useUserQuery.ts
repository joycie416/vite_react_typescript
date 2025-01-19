import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/supabase-auth-api"

export const getUserQuery = () => {
  return useQuery({
    queryFn: () => getUser(),
    queryKey: ['user', 'userInfo']
  })
}