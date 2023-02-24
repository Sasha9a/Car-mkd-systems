export interface ConfigInterface {
  production: boolean,
  secret: string,
  expiresIn: number,
  connection: {
    type: 'mysql' | 'mariadb',
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    synchronize: boolean
  }
}
