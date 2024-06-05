"use client"

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function Matchup() {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Matchup
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form>
            <DialogHeader>
              <DialogTitle>Add Matchup</DialogTitle>
              <DialogDescription>
                Add the players that participated in the matchup.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Name
                </Label>
                <input type="hidden" />
                <Input
                  id="name"
                  autoComplete="false"
                  name="fullName"
                  placeholder="i.e. John Doe"
                  type="text"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter className="items-center">
              <SubmitButton buttonLabel="Add Matchup" /> 
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
}
