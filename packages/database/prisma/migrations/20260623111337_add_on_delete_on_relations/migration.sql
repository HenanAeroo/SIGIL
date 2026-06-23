-- DropForeignKey
ALTER TABLE "guild_members" DROP CONSTRAINT "guild_members_guildId_fkey";

-- DropForeignKey
ALTER TABLE "guild_members" DROP CONSTRAINT "guild_members_userId_fkey";

-- AddForeignKey
ALTER TABLE "guild_members" ADD CONSTRAINT "guild_members_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_members" ADD CONSTRAINT "guild_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
