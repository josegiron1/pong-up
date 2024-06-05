"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { Modal } from "@/components/ui/modal";

export function AddMatchup() {
  return (
        <form>
          <div>
            <p className="text-lg">Add Matchup</p>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name2</Label>
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
            <SubmitButton buttonLabel="Add Matchup" />
        </form>
  );
}

export function PlayersInformation(props: any) {
  console.log(props);
  const router = useRouter();
  const [searchParams, setSearchParams] = useSearchParams()
  const { id } = useParams();

  function openModal(userId: number) {
    console.log(userId);
    router.push(`?modal=${userId}`);
  }

  
  return (
    <>
      <Table className="table-auto ">
        <TableCaption>Players Rankings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Rank</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Elo Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.users.map((user: any, idx: number) => (
            <TableRow key={user.id} onClick={() => openModal(user.id)}>
              <TableCell className="text-center">Rank {idx + 1}</TableCell>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.elo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {searchParams?.length && searchParams[0] === "modal" && (
        <Modal onClose={() => router.push(`/companies/${id}`)}>
          <DialogTitle>Matchup</DialogTitle>
          <DialogContent>
            <AddMatchup />
          </DialogContent>
          <DialogFooter>
            <Button>Close</Button>
          </DialogFooter>
        </Modal>
      )}
    </>
  );
}
