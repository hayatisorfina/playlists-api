import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './entities/playlist.entity';
import { MediaItem } from '../media/entities/media.entity';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { MediaService } from '../media/media.service';
import { CreateMediaDto } from '../media/dto/create-media.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist)
    private playlistModel: typeof Playlist,
    private readonly mediaService: MediaService,
  ) {}

  create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistModel.create(createPlaylistDto as any);
  }

  findAll() {
    return this.playlistModel.findAll({
      include: [MediaItem],
    });
  }

  async findOne(id: number) {
    const playlist = await this.playlistModel.findByPk(id, {
      include: [MediaItem],
    });

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

  async addMedia(playlistId: number, mediaId: number) {
    const playlist = await this.findOne(playlistId);

    await playlist.$add('mediaItems', mediaId);

    return {
      success: true,
      message: 'Media added to playlist',
    };
  }

  async createMedia(playlistId: number, createMediaDto: CreateMediaDto) {
    const media = await this.mediaService.create(createMediaDto);

    try {
      await this.addMedia(playlistId, media.id);
    } catch (error) {
      await media.destroy();
      throw error;
    }

    return media;
  }

  async removeMedia(playlistId: number, mediaId: number) {
    const playlist = await this.findOne(playlistId);
    const media = await this.mediaService.findOne(mediaId);
    const isAttached = playlist.mediaItems.some(
      ({ id }) => id === media.id,
    );

    if (!isAttached) {
      throw new NotFoundException(
        `Media with ID ${mediaId} is not attached to playlist ${playlistId}`,
      );
    }

    await playlist.$remove('mediaItems', mediaId);
    await this.mediaService.remove(mediaId);

    return {
      success: true,
      message: 'Media deleted from playlist',
    };
  }
}
