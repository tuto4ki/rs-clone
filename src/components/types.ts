export interface IOveralScore {
  pageCount: number;
  data: Array<IWinner>;
}

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
  time: number;
  isStart?: boolean;
}

export interface ISelectData {
  sortData: number;
  level: number;
}
