import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediaItem } from './entities/media.entity';

@Module({
  imports: [SequelizeModule.forFeature([MediaItem])],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
