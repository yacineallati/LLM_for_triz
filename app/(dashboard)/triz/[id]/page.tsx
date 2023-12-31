import Editor from "@/components/editor"
import { getUserFromClerkID } from "@/util/auth"
import { prisma } from "@/util/db"

const getEntry = async (id) => {
    const user = await getUserFromClerkID()
    const entry = await prisma.trizEntry.findUnique({
        where: {
            userId_id : {
                userId: user.id,
                id: id,
            }
        },
        include: {
            analysis: true,
        },
        
    })
    return entry
}
const Trizeditorpage = async ({ params }) => {
    const entry = await getEntry(params.id)

    return ( 
        <div className="w-full h-full">
            <Editor entry={entry} />
        </div>
    )
}

export default Trizeditorpage