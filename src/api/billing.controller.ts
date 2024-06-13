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

      const log = (message: string) => {
        if (global.sseResponse) {
          global.sseResponse.write(
            `event: user-log\ndata: ${JSON.stringify({ message })}\n\n`,
          );
        }
      };

      await this.service.transform(file.originalname, filePath, log);

      // Emit an event of process progress friendly for SSE
      if (global.sseResponse) {
        global.sseResponse.write(
          `event: user-log\ndata: ${JSON.stringify({
            message: `O arquivo "${file.originalname}" foi processado com sucesso.`,
          })}\n\n`,
        );
      }
    });

    await Promise.all(filePromises);

    // Emit a conclusion event for SSE
    if (global.sseResponse) {
      global.sseResponse.write(
        `event: user-log\ndata: ${JSON.stringify({
          message: 'Todos os arquivos foram processados com sucesso.',
        })}\n\n`,
      );
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

    global.sseResponse = res;
  }
}
