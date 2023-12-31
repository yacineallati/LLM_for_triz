import { UserButton } from "@clerk/nextjs/app-beta"
import Link from 'next/link'


const links = [
    {name: "Home", href: "/"},
    {name: "Triz", href: "/triz"},
]

const DashboardLayout = ({ children }) => {
    return (
        <div className="w-screen h-screen relative">
          <div className="h-full w-full">
            <header className="h-[60px] border-b border-black/10">
              <nav className="px-4 h-full">
                <div className="flex items-center justify-end h-full">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </nav>
            </header>
            <div className="h-[calc(100vh-60px)]">{children}</div>
          </div>
        </div>
      )
    }
export default DashboardLayout