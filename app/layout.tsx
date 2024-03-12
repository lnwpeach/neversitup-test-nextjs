import CssBaseline from '@mui/material/CssBaseline'
// import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { AppProps } from 'next/app'
import Head from 'next/head'

import Providers from '@/components/providers'
import theme from '@/lib/theme'
import { pageWithoutAuth } from '@/utils/constants'

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers {...pageProps}>
        <CssBaseline />
        <Component {...pageProps} />
      </Providers>
    </>
  )
}

MyApp.getInitialProps = ({ ctx: { req, res }, router }: { ctx: any; router: any }) => {
  if (!!req && !!res && !pageWithoutAuth.includes(router.route)) {
    if (!req?.cookies.auth) {
      res.writeHead(307, { Location: '/login' })
      res.end()
    }
  }

  return {
    pageProps: {
      uDataFromServer: req?.cookies.auth,
    },
  }
}
