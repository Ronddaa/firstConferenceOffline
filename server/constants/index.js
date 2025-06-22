import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASS: 'SMTP_PASS',
  SMTP_FROM: 'SMTP_FROM',
};

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  CLOUD_API_KEY: 'CLOUD_API_KEY',
  CLOUD_API_SECRET: 'CLOUD_API_SECRET',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ONE_WEEK = 24 * 60 * 60 * 1000 * 7;
