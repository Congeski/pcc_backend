import { PartialType } from "@nestjs/mapped-types";
import { CreateSolicitacaoDefesaDto } from "./create-solicitacao-defesa.dto";

export class UpdateSolicitacaoDefesa extends PartialType(CreateSolicitacaoDefesaDto){}