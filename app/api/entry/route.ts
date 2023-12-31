import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { NextResponse } from 'next/server'
import {update} from '@/util/actions'

export const POST = async (request: Request) => {
    const data = await request.json()
    const user = await getUserFromClerkID()
    const entry = await prisma.trizEntry.create({
        data: {
            content: data.content,
            user: {
                connect: {
                    id: user.id,
                },
            },
            analysis: {
                create: {
                    primary_contradiction: 'none',
                    secondary_contradiction: 'none',
                    Triz_principles: 'none',
                    Innovative_Solutions: 'none',
                    Benefits: 'none',
                    Risks: 'none',
                    userId: user.id,
                },
        },
    },
    })


    update(['/triz'])
    return NextResponse.json({ data: entry })
}