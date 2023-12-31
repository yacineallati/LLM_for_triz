import { prisma } from '@/util/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function NewUser() {
  const user = await currentUser()
  console.log(user)

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id as string,
        email: user.emailAddresses[0]?.emailAddress as string,
      },
    })
  }
  redirect('/triz');
}
