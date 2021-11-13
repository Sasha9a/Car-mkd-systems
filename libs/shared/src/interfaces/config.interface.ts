export interface ConfigInterface {
  production: boolean,
  connection: {
    secret: string,
    db: string,
    expiresIn: number
  }
}
