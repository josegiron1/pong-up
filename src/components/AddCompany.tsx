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
import { createCompanies } from "@/app/companies/actions";

import SubmitButton from "./SubmitButton";
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";

export default function AddCompany({ userId }: { userId: number}) {
  const [name, setName] = useState("");
  const [state, dispatch] = useFormState(createCompanies);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={dispatch}>
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
              value={name}
              placeholder="i.e. Gdev"
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          <SubmitButton buttonLabel="Add Company" disabled={state?.message === "Created"} /> 
          { state?.message === "Created" && <p className="text-green-500 text-xs">{state.message}</p> }
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
