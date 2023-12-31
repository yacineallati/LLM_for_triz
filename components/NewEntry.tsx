'use client'
import { newEntry } from "@/util/api"
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'


const NewEntry = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const  {data}  = await newEntry()
    router.push(`/triz/${data.id}`)
  }
    return (  
        <div
        className="cursor-pointer overflow-hidden rounded-lg bg-Blue shadow">
        <div className="px-4 py-5 sm:p-3" onClick={handleOnClick}>
        <span className="text-Mint">New Entry</span>
        </div>
    </div>
  )
}
export default NewEntry