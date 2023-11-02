"use client"

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCompany({ userId, revalidate }: { userId: number, revalidate: any}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await fetch ('/companies/create',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, userId }),
      }
      )
      const data = await res.json()
      setOpen(false)
      revalidate()
      router.push(`/companies/${data.id}`)
    }
    catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
        <DialogHeader>
          <DialogTitle>Add Company</DialogTitle>
          <DialogDescription>
            Add a company to start the ping-pong ranking race.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <input type="hidden" name="userId" value={userId} />
            <Input
              id="name"
              autoComplete="false"
              name="name"
              placeholder="i.e. Gdev"
              type="text"
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          <SubmitButton disabled={loading} buttonLabel="Add Company" /> 
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
