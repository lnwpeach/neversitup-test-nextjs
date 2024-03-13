import LoginComponent from '@/components/Login'
import { isAuth } from '@/components/providers/Auth'

export default function LoginPage(): JSX.Element {
  return <LoginComponent />
}

export async function getServerSideProps({ req }: { req: any }) {
  const auth = req?.cookies.auth
  return {
    redirect: isAuth(auth) ? { destination: '/todo', permanent: false } : false,
    props: {},
  }
}
