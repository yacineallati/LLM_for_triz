import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/triz' : '/new-user'
  return ( 
  <div className="w-screen h-screen bg-black flex justify-center items-center text-Mint">
    <div className="w-full max-w-[600px] mx-auto">
      <h1 className="text-6xl mb-4">Triz Copilot</h1>
      <p className="text-2xl mb-4 text-Mint/50">optimise your creativity</p>
      <div className="flex justify-center">
        <Link href={href}>
          <button className="btn btn-primary bg-Gray p-4 rounded-lg text-xl ">Get started</button>
        </Link>
      </div>
  </div>
  </div>
  )
}
