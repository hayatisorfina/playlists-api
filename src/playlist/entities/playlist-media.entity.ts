import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Playlist } from './playlist.entity';
import { MediaItem } from '../../media/entities/media.entity';

@Table({
  tableName: 'playlist_media',
  timestamps: false,
})
export class PlaylistMedia extends Model {
  @ForeignKey(() => Playlist)
  @Column
  playlistId: number;

  @ForeignKey(() => MediaItem)
  @Column
  mediaItemId: number;
}