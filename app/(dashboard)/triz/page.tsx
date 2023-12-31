import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import Question from '@/components/Question'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import Link from 'next/link'

const getEntries = async () => {
    const user = await getUserFromClerkID()
    const data = await prisma.trizEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
          analysis: true,
        },
      })
    
      return data
}


const trizpage = async () => {
    const data = await getEntries()
    return (
        <div className="px-6 py-8 bg-zinc-100/50 h-full">
          <h1 className="text-4xl mb-12">Triz Study case</h1>
          <div className="my-8">
            <Question />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <NewEntry />
            {data.map((entry) => (
              <div key={entry.id}>
                <Link href={`/triz/${entry.id}`}>
                  <EntryCard entry={entry} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
export default trizpage
