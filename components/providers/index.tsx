import { ThemeProvider } from '@mui/material/styles'
import { ComponentType, ReactNode } from 'react'

import theme from '@/lib/theme'

import { AuthProvider } from './Auth'

interface Props {
  components: Array<[ComponentType<any>, Record<string, any>] | ComponentType<any>>
  children: ReactNode
}

export default function Providers({
  dataFromServer,
  children,
}: {
  dataFromServer: any
  children: ReactNode
}): JSX.Element {
  return (
    <Compose
      components={[
        [AuthProvider, { dataFromServer }],
      ]}
    >
      {children}
    </Compose>
  )
}

function Compose({ components, children }: Props): ReactNode {
  return components.reduceRight((prev, curr): ReactNode => {
    if (Array.isArray(curr)) {
      const [Component, props] = curr
      return <Component {...props}>{prev}</Component>
    }

    const Component = curr as ComponentType<any>
    return <Component>{prev}</Component>
  }, children)
}
