import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //delete existing records
  await prisma.task.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  //
  //   const user = await prisma.user.create({
  //     data: {
  //       email: "mrunal@paramlogic.com",
  //       password: "everyoneknows",
  //     },
  //   });

  //   const profile = await prisma.profile.create({
  //     data: {
  //       name: "Mrunal",
  //       designation: "CEO",
  //       userId: user.id,
  //     },
  //   });

  const userData = await prisma.profile.create({
    data: {
      name: "Abc Xyz",
      designation: "CEO",
      user: {
        create: {
          email: "abc2@xyz.com",
          password: "12345",
        },
      },
    },
  });

  const taskOfUser = await prisma.task.create({
    data: {
      title: "Take session on prisma",
      description: "This session will be on tech-exploration channel",
      userId: userData.userId,
    },
  });

  console.log("User Data: ", userData);
  console.log("User task: ", taskOfUser);

  const userDetails = await prisma.user.findMany({
    where: {
      email: "abc@xyz.com",
    },
    include: {
      Profile: {
        select: {
          name: true,
          designation: true,
        },
      },
      Task: true,
    },
  });

  console.log("userDetails along with profile: ", JSON.stringify(userDetails));

  const tag = await prisma.tag.create({
    data: {
      name: "Easy",
    },
  });

  const tasksAndTags = await prisma.task.update({
    where: {
      id: taskOfUser.id,
    },
    data: {
      tags: {
        connect: {
          id: tag.id,
        },
      },
    },
    select: {
      tags: true,
      completed: true,
      title: true,
      description: true,
      createdAt: true,
    },
  });

  console.log("Many to Many mapping: ", tasksAndTags);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
