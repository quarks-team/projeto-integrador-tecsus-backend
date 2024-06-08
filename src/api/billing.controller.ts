import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BillingService } from '../domain/service/billing.service';
import * as path from 'path';
import { mkdir, writeFile } from 'fs/promises';

@Controller('billing')
export class BillingController {
  constructor(private readonly service: BillingService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const folderPath = path.join(__dirname, 'files');
    await mkdir(folderPath, { recursive: true });

    const filePromises = files.map(async (file) => {
      const filePath = path.join(folderPath, file.originalname);
      await writeFile(filePath, file.buffer);
      await this.service.transform(file.originalname, filePath);

      // Emite um evento de progresso para o SSE
      if (global.sseResponse) {
        global.sseResponse.write(
          `data: ${JSON.stringify({
            message: `O arquivo "${file.originalname}" foi processado com sucesso.`,
          })}\n\n`,
        );
      }
    });

    await Promise.all(filePromises);

    // Emite um evento de conclusão para o SSE
    if (global.sseResponse) {
      global.sseResponse.end();
    }

    return { message: 'Todos os arquivos foram processados com sucesso.' };
  }

  @Get('upload/sse')
  sse(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Armazena a resposta SSE globalmente para ser usada pelo endpoint de upload
    global.sseResponse = res;
  }
}
