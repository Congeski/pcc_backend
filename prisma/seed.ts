import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(crypto.scrypt);

async function encryptPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = (await scryptAsync(password, salt, 32)) as Buffer;
  const hashedPassword = salt + '.' + hash.toString('hex');
  return hashedPassword;
}

const prisma = new PrismaClient();
async function seeder() {
  console.log('[Seeder] ===> Inicializando com a Secretária Admin...');

  const secretariaAdminEmail = process.env.SEED_SECRETARIA_ADMIN_EMAIL;
  const secretariaAdminSenha = process.env.SEED_SECRETARIA_ADMIN_SENHA;

  if (!secretariaAdminEmail) {
    throw new Error('Verifique se seu ENV tem: SEED_SECREATRIA_ADMIN_EMAIL.');
  }
  if (!secretariaAdminSenha) {
    throw new Error('Verifique se seu ENV tem: SEED_SECRETARIA_ADMIN_SENHA.');
  }
  const senha: string = await encryptPassword(secretariaAdminSenha);

  await prisma.usuario.upsert({
    where: {
      email_institucional: secretariaAdminEmail,
    },
    create: {
      email_institucional: secretariaAdminEmail,
      senha: senha,
      nome_civil: 'Secretaria admin',
      secretaria: {
        create: {
          acesso_admin: true,
        },
      },
    },
    update: {},
  });

  console.log('[Seeder] ===> Secretária Admin criada com sucesso...!');
}

seeder()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
