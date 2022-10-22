export interface Prefecture {
  id: string;
  name: string;
}

export interface GetPrefecturesResponse {
  message: null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
}
