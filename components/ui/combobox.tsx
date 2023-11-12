"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { buildUrl, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { User } from "@/types"

export function Combobox({
    onValueSelect
}: {
    onValueSelect: (value: User) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<User>()
  const [users, setUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    const getUsers = async () => {
      const result = await fetch(buildUrl('user'), {
        cache: 'no-cache'
      })

      const users = await result.json()
      console.log(users)
      setUsers(users)
    }

    getUsers()
  },[]);

  const handleSelect = (value: string) => {
    const user = users.find(u => u.fullName.toLowerCase() === value.toLowerCase())
    onValueSelect(user as User)
    setValue(user)
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? users.find((user) => user.fullName === value.fullName)?.fullName
            : "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {users.map((user) => (
              <CommandItem
                key={user.id}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.fullName === user.fullName ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.fullName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
