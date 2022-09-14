import { HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { Attachment, AuthenticatedRequest } from './types';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
  return bcrypt.compare(rawPassword, hashedPassword);
}

export function isAuthorized(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  console.log('isAuthorized');
  if (req.user) next();
  else throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
}

export const generateUUIDV4 = () => uuidv4();

export const compressImage = (attachment: Attachment) =>
  sharp(attachment.buffer).resize(300).jpeg().toBuffer();
