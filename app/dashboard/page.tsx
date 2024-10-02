'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import AddCoruse from './_components/AddCoruse'
import CourseList from './_components/CourseList'

function Dashboard() {
  const { user } = useUser();

  console.log(user?.id)
  if (user?.id == undefined) {
    return 
  }
  return (
    <div>
      <AddCoruse />
      <CourseList userId={user?.id}/>
    </div>
  )
}

export default Dashboard
