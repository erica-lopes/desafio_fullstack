export interface IClientRequest {
    name: string;
    email: string;
    phoneNumber: string;
    password?: string;
  }
  
  export interface IClientResponse extends IClientRequest {
    id: string;
    registrationDate: Date;
  }
  
  export interface IClientUpdateRequest {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }
  