import { PLAYER_TYPE } from "./constGame";

export default interface IAnimationKey {
  walk: string;
  dead: string;
  run: string;
  scale: number;
  score: number;
  bodySize: {
    width: number;
    height: number;
  };
  mass: number;
}

export interface IPassScene {
  scene: string;
  isDied?: boolean;
  playerType?: PLAYER_TYPE;
  isStart?: boolean;
  isLevelNext?: boolean;
}
