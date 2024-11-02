import { ILevelData } from '../../api/getGameInfo-types';

export type ShortLevelData = Omit<ILevelData, 'id' | 'imageSrc'>;
