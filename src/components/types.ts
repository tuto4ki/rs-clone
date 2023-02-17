export type OveralScore = Array<IWinner>;

export interface ISortQuery {
  sort?: string;
  order?: string;
  level?: number;
  page?: number;
  limit?: number;
}

export interface IWinner {
  username: string;
  level: number;
  score: number;
  time: string;
  isStart?: boolean;
}
