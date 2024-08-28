import { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'

type props = {
  children: ReactNode
}

const DashboardLayout = ({ children }: props) => {
  return (
    <div>
      <div className='md:w-64 hidden md:block'>
        <Sidebar />
      </div>
      <div className='md:ml-64 p-5'>
        <Header/>
        <div className='p-5'></div>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
