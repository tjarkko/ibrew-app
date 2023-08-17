import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  request.json
  const body = await request.json()
  const {name, email, password} = body
  console.log(body)

  if(!name || !email || !password){
    return new NextResponse("Missing name, email or password", {
      status: 400
    })
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  if(exist){
    console.log("User already exists")
    return new NextResponse("User already exists", {
      status: 400
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash
    }
  })

  return NextResponse.json(user)
}