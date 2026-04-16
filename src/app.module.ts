import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaylistModule } from './playlist/playlist.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'playlist',

      autoLoadModels: true,
      synchronize: true,
    }),

    // Modules
    PlaylistModule,

    MediaModule,
  ],
})
export class AppModule {}