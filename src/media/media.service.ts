import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MediaItem } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(MediaItem)
    private mediaModel: typeof MediaItem,
  ) {}

  create(createMediaDto: CreateMediaDto) {
    return this.mediaModel.create(createMediaDto as any);
  }

  findAll() {
    return this.mediaModel.findAll();
  }

  findOne(id: number) {
    const media = this.mediaModel.findByPk(id);

    if (!media) {
      throw new NotFoundException(
        `Media with ID ${id} not found`,
      );
    }
    
    return media;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.mediaModel.update(updateMediaDto as any, {
      where: { id },
    });
  }

  async remove(id: number) {
    const media = await this.findOne(id);
    return media.destroy();
  }
}
