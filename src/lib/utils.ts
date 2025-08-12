import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const ctwMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'h2',
        'h3',
        'p18-20',
        'p16-17',
        'p15-16',
        'p13-14',
        'p18',
        'p17b',
        'p17m',
        'p16b',
        'p16sb',
        'p16m',
        'p15b',
        'p15m',
        'p14',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return ctwMerge(clsx(inputs));
}
