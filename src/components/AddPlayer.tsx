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


export default function AddPlayer({ companyId }: { companyId: string}) {
  const [fullName, setFullName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch("/api/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, companyId }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Player
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
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
            <input type="hidden" name="companyId" value={companyId} />
            <Input
              id="name"
              autoComplete="false"
              name="fullName"
              placeholder="i.e. John Doe"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          <SubmitButton buttonLabel="Add Player" /> 
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
