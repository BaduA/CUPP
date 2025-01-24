import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'yasar@yasar.io' },
    update: {},
    create: {
      email: 'yasar@yasar.io',
      name: 'Yaşar',
      lastname: "Hüseyin",
      username: "yasarhus",
      password: hashSync("12345678",10),
      phoneNumber: "905554443322",
      role: "APP_ADMIN"  
    },
  })
  console.log({ alice })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })