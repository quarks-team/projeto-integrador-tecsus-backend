import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BillingService } from 'src/domain/service/billing.service';
import { GenerateWatterFact } from 'src/domain/use-case/generate-watter-fact.use-case';
import * as path from 'path';
import { mkdir, writeFile } from 'fs/promises';

@Controller('billing')
export class BillingController {
  constructor(private readonly service: BillingService,
    private readonly fatoService: GenerateWatterFact
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async putFile(@UploadedFiles() files: Express.Multer.File[]) {
    const folderPath = path.join(__dirname, 'files');

    await mkdir(folderPath, { recursive: true });

    for (const file of files) {
      const filePath = path.join(folderPath, file.originalname);
      await writeFile(filePath, file.buffer);
      await this.service.transform(file.originalname, filePath);
    }
  }

  @Get('fato')
  async fato() {
    this.fatoService.execute();
  }
}
