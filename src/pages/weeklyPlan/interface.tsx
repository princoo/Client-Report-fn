export interface initialTypes {
  loading: boolean;
  tasks: TaskData[];
  error: string | null;
}

export interface TaskData {
  id: string;
  dueDate: string;
  status: 'PENDING' | 'COMPLETED';
  description: string;
  WeeklyPlanId: string;
  createdAt: string;
  updatedAt: string;
  WeeklyPlan: {
    id: string;
    User: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
}
export interface DefaultResponse {
  code: number;
  message: string;
}

export interface OnUpdateResponse extends DefaultResponse {
  data: [number, TaskData[]];
}
export interface OnDeleteResponse extends DefaultResponse {
  data: number;
}
export interface OnAddResponse extends DefaultResponse {
  data: TaskData;
}

export interface OnAddBody {
  description: string;
  dueDate: string;
}
