import { update } from '@/util/actions'
import { prisma } from '@/util/db'
import { getUserFromClerkID } from '@/util/auth'
import { NextResponse } from 'next/server'
import { analyze } from '@/util/ai'
import { revalidatePath } from 'next/cache'

export const DELETE = async (request: Request, { params }) => {
    const user = await getUserFromClerkID()
  
    await prisma.trizEntry.delete({
      where: {
        userId_id: {
          id: params.id,
          userId: user.id,
        },
      },
    })
  
    update(['/triz'])
  
    return NextResponse.json({ data: { id: params.id } })
  }


export const PATCH = async (request: Request, { params }) =>{
    const { updates } = await request.json()
    const user = await getUserFromClerkID()
    const entry = await prisma.trizEntry.update({
        where:{
            userId_id: {
                userId: user.id,
                id: params.id,
            },
            },
            data: updates,
    })
    const analysis = await analyze(entry)

    const savedAnalysis = await prisma.analysis.upsert({
            where: {
                entryId: entry.id,
            },
            update: { ...analysis },
            create: {
                entryId: entry.id,
                userId: user.id,
                ...analysis,
            },
        })
        revalidatePath('/triz/[id]', 'page')
        return NextResponse.json({data: {...entry, analysis: savedAnalysis}})
}
