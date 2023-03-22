import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  await prisma.contact.create({
    data: {
      firstName: "Bob",
      lastName: "Jones",
      age: 55,
      company: "Microsoft",
      department: "Software Engineering"
    },
  });

  await prisma.contact.create({
    data: {
      firstName: "Bill",
      lastName: "Brown",
      age: 40,
      company: "Google",
      department: "Sales"
    },
  });

  await prisma.contact.create({
    data: {
      firstName: "Martha",
      lastName: "Kaufman",
      age: 26,
      company: "Google",
      department: "Hardware Engineering"
    },
  });

  await prisma.contact.create({
    data: {
      firstName: "Max",
      lastName: "Power",
      age: 28,
      company: "Microsoft",
      department: "Marketing"
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
