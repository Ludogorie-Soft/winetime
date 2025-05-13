import { Loader2 } from 'lucide-react'
import Image from 'next/image'

const LoaderProducts = () => {
  return (
    <div style={{ zIndex: 10000 }} className="flex items-center justify-center gap-2">
      <Loader2 className="h-6 w-6 animate-spin text-red-500" />
      <p className="text-center text-red-500 text-2xl">WineTime</p>
    </div>
  )
}

export default LoaderProducts
