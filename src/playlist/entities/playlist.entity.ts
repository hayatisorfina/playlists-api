import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { MediaItem } from '../../media/entities/media.entity';
import { PlaylistMedia } from './playlist-media.entity';

@Table({
  tableName: 'playlists',
  timestamps: true,
})
export class Playlist extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @BelongsToMany(() => MediaItem, () => PlaylistMedia)
  mediaItems: MediaItem[];
}