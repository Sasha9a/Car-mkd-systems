import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { environment } from "../environments/environment";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: environment.connection.type,
      host: environment.connection.host,
      port: environment.connection.port,
      username: environment.connection.username,
      password: environment.connection.password,
      database: environment.connection.database,
      synchronize: environment.connection.synchronize,
      autoLoadEntities: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  public constructor(private readonly dataSource: DataSource) {}
}
