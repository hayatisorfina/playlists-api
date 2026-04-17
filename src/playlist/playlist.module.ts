import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlist } from './entities/playlist.entity';
import { PlaylistMedia } from './entities/playlist-media.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Playlist, PlaylistMedia]),
    MediaModule,
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
