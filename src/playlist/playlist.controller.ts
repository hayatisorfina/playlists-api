import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }

  @Post(':id/media/:mediaId')
  addMedia(
    @Param('id') id: string,
    @Param('mediaId') mediaId: string,
  ) {
    return this.playlistService.addMedia(
      Number(id),
      Number(mediaId),
    );
  }

  @Delete(':id/media/:mediaId')
  removeMedia(
    @Param('id') id: string,
    @Param('mediaId') mediaId: string,
  ) {
    return this.playlistService.removeMedia(
      Number(id),
      Number(mediaId),
    );
  }
}
