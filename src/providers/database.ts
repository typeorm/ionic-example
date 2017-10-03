import { Injectable } from '@angular/core';
import { createConnection, Connection } from 'typeorm';

import { Author } from '../entities/author';
import { Category } from '../entities/category';
import { Post } from '../entities/post';

@Injectable()
export class DatabaseProvider {
  private connection: Connection;

  async connect () {
    this.connection = await createConnection({
      type: 'cordova',
      database: 'test',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [
        Author,
        Category,
        Post
      ]
    });
  }

  async getConnection(): Promise<Connection> {
    if(!this.connection || !this.connection.isConnected) {
      await this.connect();
    }
    return this.connection;
  }
}
