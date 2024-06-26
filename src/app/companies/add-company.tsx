"use client"

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SubmitButton from "../../components/SubmitButton";
import { Modal } from "@/components/ui/modal";
import { useSearchParams } from "next/navigation";

export default function AddCompany({ userId, createCompany }: { userId: number, createCompany: any}) {
  const open = useSearchParams().get("open");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // @ts-ignore
    await createCompany(new FormData(e.target))

  }

  return (
    <Modal onClose={() => {}} setShowModal={() => {}} preventDefaultClose={true} className=""
    showModal={!!open}>
      <form onSubmit={onSubmit}>
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
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          <DialogClose asChild>
            <SubmitButton buttonLabel="Add Company" /> 
          </DialogClose>
        </DialogFooter>
      </form>
    </Modal>
  )

  // return (
  //   <Dialog>
  //     <DialogTrigger asChild>
  //       <Button>
  //         <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Company
  //       </Button>
  //     </DialogTrigger>
  //     <DialogContent className="sm:max-w-[425px]">
  //       <form onSubmit={onSubmit}>
  //       <DialogHeader>
  //         <DialogTitle>Add Company</DialogTitle>
  //         <DialogDescription>
  //           Add a company to start the ping-pong ranking race.
  //         </DialogDescription>
  //       </DialogHeader>
  //       <div className="grid gap-4 py-4">
  //         <div className="grid grid-cols-4 items-center gap-4">
  //           <Label htmlFor="name" className="text-right">
  //             Name
  //           </Label>
  //           <input type="hidden" name="userId" value={userId} />
  //           <Input
  //             id="name"
  //             autoComplete="false"
  //             name="name"
  //             placeholder="i.e. Gdev"
  //             type="text"
  //             className="col-span-3"
  //           />
  //         </div>
  //       </div>
  //       <DialogFooter className="items-center">
  //         <DialogClose asChild>
  //           <SubmitButton buttonLabel="Add Company" /> 
  //         </DialogClose>
  //       </DialogFooter>
  //       </form>
  //     </DialogContent>
  //   </Dialog>
  // );
}
