import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/pets.entity';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // path where schema file be generated
    sortSchema: true, // Sort schema lexicographically (default sort order is in which they are defined in included modules)

  }),
  TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "booksdb",
    // entities:[Pet],
    synchronize: true,
    autoLoadEntities: true,
    // dropSchema: true,
  }),
  PetsModule,
  OwnersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
