import classnames, { ArgumentArray } from 'classnames';

export const cn = (...args: ArgumentArray): string => classnames(args);
