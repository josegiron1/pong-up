"use client";

import React, { useEffect, useState } from "react";
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

export default function AddPlayer({ userId }: { userId: number}) {
  const [name, setName] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
        <DialogHeader>
          <DialogTitle>Add Player</DialogTitle>
          <DialogDescription>
            Add a player to start playing.
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
              name="fullName"
              value={name}
              placeholder="i.e. John Doe"
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          {/* <SubmitButton buttonLabel="Add Company" />  */}
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
