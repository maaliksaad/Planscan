'use client'

import type { ComponentProps, FC } from 'react'
import * as ResizablePrimitive from 'react-resizable-panels'

import { cn } from '@/utils/cn'

const ResizablePanelGroup: FC<
  ComponentProps<typeof ResizablePrimitive.PanelGroup>
> = ({ className, ...props }) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className
    )}
    {...props}
  />
)

const { Panel: ResizablePanel } = ResizablePrimitive

const ResizableHandle: FC<
  ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean
  }
> = ({ withHandle, className, ...props }) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative flex w-px items-center justify-center bg-zinc-200 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className
    )}
    {...props}
  />
)

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
