export interface JwtResponse {
  dataUser:{
    id: number,
    name: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    expiresIn: string
  }

}
