import prisma from "../src/index";

async function main() {
  await prisma.$transaction(async (tx) => {
    const guild = await tx.guild.upsert({
      where: { discordId: "123456789" },
      create: { discordId: "123456789", serverName: "Serveur de test" },
      update: {},
    });

    const user = await tx.user.upsert({
      where: { discordId: "987654321" },
      create: { discordId: "987654321", discordUsername: "TestUser" },
      update: {},
    });

    await tx.guildMember.upsert({
      where: { guildId_userId: { guildId: guild.id, userId: user.id } },
      create: { guildId: guild.id, userId: user.id },
      update: {},
    });
  });

  console.log("Seed OK");
}

if (process.env.NODE_ENV === "production") {
  throw new Error();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
