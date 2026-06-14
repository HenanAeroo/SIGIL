export interface GuildConfig {
  guildId: string;
  botName: string;
  theme: string;
  aiPersonality: string;
}

export interface Faction {
  id: string;
  guildId: string;
  name: string;
  description: string;
}

export interface Character {
  id: string;
  guildId: string;
  userId: string;
  factionId?: string;
  name: string;
  level: number;
  xp: number;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    constitution: number;
    charisma: number;
  };
}

export interface DiceRoll {
  formula: string;
  rolls: number[];
  total: number;
  success: boolean;
}
