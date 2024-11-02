import { ILevel, IRound } from './getGameInfo-types';

export async function getLevelInfo(level: number): Promise<ILevel> {
  const res = await fetch(
    `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${level}.json`,
  )
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => new Error(err));
  return res;
}

export async function getRoundInfo(level: number, round: number): Promise<IRound> {
  const currLevel = await getLevelInfo(level);
  const { rounds } = currLevel;
  return rounds[round];
}
