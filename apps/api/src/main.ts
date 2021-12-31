/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import {ExpressAdapter} from "@nestjs/platform-express";
import * as http from "http";
import * as https from "https";

import { AppModule } from './app/app.module';
import * as fs from 'fs';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const privateKey = fs.readFileSync(__dirname + '/../../../deploy/server.key', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/../../../deploy/server.crt', 'utf8');
  const httpsOptions = { key: privateKey, cert: certificate };
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env['PORT'] || 3000;
  await app.init();

  http.createServer(server).listen(port);
  https.createServer(httpsOptions, server).listen(443);
}

bootstrap().catch(console.error);
