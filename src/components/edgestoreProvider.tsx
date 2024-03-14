import { EdgeStoreProvider } from '@/lib/edgestore'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const EdgeProvider = ({children}:Props) => {
  return (
    <EdgeStoreProvider>
        {children}
    </EdgeStoreProvider>
  )
}

export default EdgeProvider