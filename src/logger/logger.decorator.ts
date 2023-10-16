import { Inject } from '@nestjs/common';

export const fromLoggers: string[] = new Array<string>();

export function Logger(from: any) {
  if (!fromLoggers.includes(from)) {
    fromLoggers.push(from);
  }
  return Inject(`LoggerService${from}`);
}
