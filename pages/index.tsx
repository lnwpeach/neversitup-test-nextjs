export default function Home(): JSX.Element {
  return <></>
}

export async function getServerSideProps() {
  return {
    redirect: { destination: '/login', permanent: false },
    props: {},
  }
}
