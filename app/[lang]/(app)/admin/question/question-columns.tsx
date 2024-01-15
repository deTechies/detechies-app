"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { formatDate } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import CreateQuestion from "./create-question"
import PreviewQuestion from "./preview-question"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const questionColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "content",
    header: "Question",
  },
  {
    accessorKey: "scale",
    header: "scale",
  },
  {
    accessorKey: "category",
    header: "category",
  },
  {
    accessorKey: "created_at",
    header: ({ column }: {column:any}) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="content-end"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: {row:any}) => {
      const formatted = formatDate(row.getValue("created_at"))
 
      return <div className="font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }: {row:any}) => {
      return (
        <div className="flex gap-4">
          <PreviewQuestion question={row.original} />
          <CreateQuestion defaultValues={row.original} />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  }
]