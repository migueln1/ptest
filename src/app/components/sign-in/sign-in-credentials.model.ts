export class SignInCredentials {
  constructor(
    public email: string,
    public password: string
  ) {}

}

export class SignUpData{
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
}