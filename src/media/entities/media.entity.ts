import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { PlaylistMedia } from '../../playlist/entities/playlist-media.entity';

@Table({
  tableName: 'media_items',
  timestamps: true,
})
export class MediaItem extends Model {
  @Column
  title: string;

  @Column
  durationSeconds: number;

  @Column
  url: string;

  @BelongsToMany(() => Playlist, () => PlaylistMedia)
  playlists: Playlist[];
}