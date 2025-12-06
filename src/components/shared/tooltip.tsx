import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip"
import { PropsWithChildren } from "react"

export function TooltipTitle({title, children}: PropsWithChildren<{title: string}>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  )
}
