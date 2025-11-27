export interface TVLChartDataPoint {
  date: string;
  depositTvl: number;
  borrowTvl: number;
  // Note: avgBorrowTvl and avgDepositTvl are at response level, not in chartData
}

export interface APYChartDataPoint {
  date: string;
  depositApy: number;
  borrowApy: number;
  // Note: avgBorrowApy and avgDepositApy are at response level, not in chartData
}

export interface TVLResponse {
  chartData: TVLChartDataPoint[];
  tokenSymbol: string;
  days: number;
  avgBorrowTvl: number;
  avgDepositTvl: number;
  lastUpdated: string;
}

export interface APYResponse {
  chartData: APYChartDataPoint[];
  tokenSymbol: string;
  days: number;
  avgDepositApy: number;
  avgBorrowApy: number;
  lastUpdated: string;
}

export type ChartDataPoint = {
  x: string;
  y: number;
};

export type ChartData = ChartDataPoint[];


