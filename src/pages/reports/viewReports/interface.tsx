export interface initialTypes {
  loading: boolean;
  reports: Report[];
  error: string | null;
}

export interface Report {
  id: string;
  clientName: string;
  activityDone: string;
  discussedIssues: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
}
export interface AddReportBody extends Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'UserId'> {}

export interface OnAddResponse {
  data: {
    data: Report;
    message: string;
  };
}
export interface OnUpdateResponse {
  data: {
    data: [number, Report[]];
    message: string;
  };
}
