import prisma from './prisma'
import { User } from '@prisma/client'

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data })
    console.log(user)
    return { user }
  } catch (error) {
    return { error }
  }
}

