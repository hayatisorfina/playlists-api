import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlist } from './entities/playlist.entity';
import { PlaylistMedia } from './entities/playlist-media.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';

@Module({
  imports: [SequelizeModule.forFeature([Playlist, PlaylistMedia])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}