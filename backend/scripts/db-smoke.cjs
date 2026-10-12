const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.$queryRaw`SELECT current_user AS user, current_database() AS database`
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
