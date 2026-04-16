import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './entities/playlist.entity';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist)
    private playlistModel: typeof Playlist,
  ) {}

  create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistModel.create(createPlaylistDto as any);
  }

  findAll() {
    return this.playlistModel.findAll();
  }

  async findOne(id: number) {
    const playlist = await this.playlistModel.findByPk(id);

    if (!playlist) {
      throw new NotFoundException(
        `Playlist with ID ${id} not found`,
      );
    }

    return playlist;
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.findOne(id);

    await playlist.update(updatePlaylistDto as any);
    return playlist;
  }

  async remove(id: number) {
    const playlist = await this.findOne(id);

    await playlist.destroy();

    return {
      success: true,
      message: 'Playlist deleted successfully',
    };
  }
}
