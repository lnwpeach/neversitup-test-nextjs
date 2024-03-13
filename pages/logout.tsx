import { useAuth } from '@/utils/hook/useAuth'

export default function LogoutPage(): JSX.Element {
  const { signOut } = useAuth()
  signOut()
  return <></>
}
