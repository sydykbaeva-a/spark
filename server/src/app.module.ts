import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ParentController } from './parent/parent.controller';
import { ChildService } from './child/child.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './db/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildEntity } from './child/child.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist', 'client'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService, imports: [ConfigModule]}),
    TypeOrmModule.forFeature([ChildEntity])
    
  ],
  controllers: [AppController, ParentController],
  providers: [AppService, ChildService],
})
export class AppModule {}


