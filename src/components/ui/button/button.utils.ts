import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90',
        destructive: 'bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90',
        outline:
          'border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900',
        secondary: 'bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80',
        ghost: 'hover:bg-zinc-100 hover:text-zinc-900',
        'ghost-destructive': 'text-red-500 hover:text-red-700',
        link: 'text-zinc-900 underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9',
        'icon-sm': 'size-7',
        'icon-xs': 'size-4 p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
