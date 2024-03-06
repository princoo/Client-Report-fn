export interface initialTypes {
  loading: boolean;
  homeVisits: HomeVisitData[];
  error: string | null;
}
export interface UserHVisit {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  iat?: number;
}
export interface OnAddBody {
  date: string;
  clientName: string;
  phone: string;
  description: string;
  images: Array<File>;
}

export interface HomeVisitData {
  id: string;
  date: string;
  clientName: string;
  phone: string;
  description: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
  HVisitImages: HomeVisitImages[];
  User: UserHVisit;
}
export interface HomeVisitImages {
  id: string;
  url: string;
  SupportGroupId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DefaultState {
  loading: boolean;
  error: string | null;
}
export interface DefaultResponse {
  code: number;
  message: string;
}
export interface OnAddState extends DefaultState {
  data: HomeVisitData | null;
}
export interface OnDeleteState extends DefaultState {
  data: number | null;
}

export interface OnAddResponse extends DefaultResponse {
  data: HomeVisitData;
  User: UserHVisit;
  HVisitImages: HomeVisitImages[];
}
export interface OnDeleteResponse extends DefaultResponse {
  data: number;
}
