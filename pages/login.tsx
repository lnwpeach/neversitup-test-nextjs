import LoginComponent from '@/components/Login'

export default function LoginPage(): JSX.Element {
  return <LoginComponent />
}

export async function getServerSideProps({ req }: { req: any }) {
  return {
    redirect: req.cookies.auth ? { destination: '/todo', permanent: false } : false,
    props: {},
  }
}
