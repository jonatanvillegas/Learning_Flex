import React, { ReactNode } from 'react'
import Header from '../dashboard/_components/Header'

type Props = {
    children: ReactNode
}
function CreateCourseLayout({ children }: Props) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default CreateCourseLayout
