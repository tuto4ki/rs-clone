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
}

export interface IPassScene {
  scene: string;
  isDied?: boolean;
}
