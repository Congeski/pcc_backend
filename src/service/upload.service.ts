import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SolicitacaoDefesa } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from './prisma.service';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private prisma: PrismaService) {
    const region = process.env.AWS_S3_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('AWS S3 está sem configuração');
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(
    solicitacaoDefesa: SolicitacaoDefesa,
    file: Express.Multer.File[],
  ) {
    if (!solicitacaoDefesa) {
      throw new BadRequestException('Usuário não pode enviar PDFs');
    }

    const bucket = process.env.AWS_S3_BUCKET_NAME;

    if (!bucket) {
      throw new Error('O bucket do S3 não está configurado');
    }

    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    const sanitizedFileName = file[0].originalname
      ? file[0].originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
      : 'default_file_name';

    const hash = uuidv4();
    const filePath = `pdf_solicitacao_defesa/${hash}/${sanitizedFileName}`;

    try {
      const anexoExiste = await this.prisma.anexo.findFirst({
        where: {
          hash: hash,
          nome_arquivo: sanitizedFileName,
        },
      });

      if (anexoExiste) {
        await this.deleteFile(hash, sanitizedFileName);
      }

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: filePath,
          Body: file[0].buffer,
          ContentType: file[0].mimetype,
        }),
      );

      await this.prisma.anexo.create({
        data: {
          hash: hash,
          nome_arquivo: sanitizedFileName,
          url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${filePath}`,
          tipo: 'COMPROVANTE_PUBLICACAO',
          solicitacao_defesa_id: solicitacaoDefesa.id,
        },
      });

      return {
        url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${filePath}`,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteFile(hash: string, nomeArquivo?: string) {
    const bucket = process.env.AWS_S3_BUCKET_NAME;

    if (!bucket) {
      throw new Error('O bucket do S3 não está configurado');
    }

    const filePath = `pdf_solicitacao_defesa/${hash}/${nomeArquivo}`;

    try {
      const response = await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: filePath,
        }),
      );

      await this.prisma.anexo.deleteMany({
        where: {
          hash: hash,
          nome_arquivo: nomeArquivo,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
