import {PrismaClient} from "@prisma/client";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function signup(email: string, password: string) {

  const createdUser = await prisma.user.create({
    data: {email, password}
  })

  if (!createdUser) throw new Error("User not created");

  return createdUser;
}

export async function signin(email: string, password: string) {

  const user = await prisma.user.findUnique({
    where: {email}
  })

  if (!user) throw new Error("User not found");

  const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
  );


  if (!passwordIsValid) throw new Error("Invalid Password!");


  const token = jwt.sign({id: user.id},
      'aTopSecretKeyThatNoOneKnows',
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });


  return {id: user.id, email: user.email, token};
}


