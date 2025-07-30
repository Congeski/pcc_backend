import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaPosGraduacaoDto } from './create-programa-pos-graduacao.dto';

export class UpdateProgramaPosGraduacaoDto extends PartialType(CreateProgramaPosGraduacaoDto) {}