import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from '@aws-sdk/client-ses';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly sesClient: SESClient;
  private readonly defaultFromEmail: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    if (!accessKeyId || !secretAccessKey) {
      this.logger.warn('Credenciais da AWS nao encontradas.');
    }

    this.sesClient = new SESClient({
      region,
      credentials: {
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
      },
    });

    this.defaultFromEmail = this.configService.get<string>(
      'DEFAULT',
      'noreply@uem.com',
    );
  }

  async sendEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<{ success: boolean; messageId?: string }> {
    try {
      const { to, subject, body, htmlBody, from, replyTo } = sendEmailDto;

      const params: SendEmailCommandInput = {
        Source: from || this.defaultFromEmail,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: body,
              Charset: 'UTF-8',
            },
            ...(htmlBody && {
              Html: {
                Data: htmlBody,
                Charset: 'UTF-8',
              },
            }),
          },
        },
        ...(replyTo && {
          ReplyToAddresses: [replyTo],
        }),
      };

      const command = new SendEmailCommand(params);
      const result = await this.sesClient.send(command);

      this.logger.log(
        `Email enviado para ${to}. MessageId: ${result.MessageId}`,
      );

      return {
        success: true,
        messageId: result.MessageId,
      };
    } catch (error) {
      this.logger.error(`Erro ao enviar email para ${sendEmailDto.to}:`, error);
      throw new BadRequestException(
        'Falha ao enviar email. Verifique os dados e tente novamente.',
      );
    }
  }
}
