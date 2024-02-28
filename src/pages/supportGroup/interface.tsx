export interface SupportGroupBody {
  date: string;
  title: string;
  description: string;
  images: Array<File | SupportGroupImages> | [];
}
export interface SGBody extends Omit<SupportGroupBody, 'images'> {}
export interface initialValues {
  date: string;
  title: string;
  description: string;
}

export interface SupportGroupData {
  id: string;
  date: string;
  title: string;
  description: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
  SGroupImages: SupportGroupImages[];
  User: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface SupportGroupImages {
  id: string;
  url: string;
  SupportGroupId: string;
  createdAt: string;
  updatedAt: string;
}
export interface initialTypes {
  loading: boolean;
  supportGroups: SupportGroupData[];
  error: string | null;
}
export interface OnAddSgResponse {
  message: string;
  data: Omit<SupportGroupData, 'SGroupImages'>;
  SGroupImages: SupportGroupImages[];
  code: number;
}

export interface singleSgResponse {
  code: number;
  message: string;
  data: {
    body: Omit<SupportGroupData, 'SGroupImages'>;
    images: SupportGroupImages[];
  };
}
export interface deleteSgResponse {
  code: number;
  message: string;
  data: {
    deletedId: string;
    result: number;
  };
}

export interface OnDeleteStates {
  loading: boolean;
  data: {
    deletedId: string;
    result: number;
  } | null;
  error: string | null;
}
export interface OnUpdateStates {
  loading: boolean;
  data: [number, Omit<SupportGroupData, 'SGroupImages'>[]] | null;
  error: string | null;
}
export interface OnUpdateResponse {
  code: number;
  message: string;
  data: [number, Omit<SupportGroupData, 'SGroupImages'>[]] | null;
}
