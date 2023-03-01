export interface iUserRetrieveResult {
  name: string;
  email: string;
  admin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface iUserUpdateBody {
  name: string;
  email: string;
  password: string;
}

export interface iUserUpdateInfo {
  id: string;
  admin: boolean;
  params: string;
}
