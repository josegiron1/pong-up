"use client"
import React from 'react'
import { Button } from './ui/button'
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton({ buttonLabel, disabled }: { buttonLabel: string, disabled?: boolean}) {
    const { pending } = useFormStatus()
  return (
    <Button disabled={pending || disabled} aria-disabled={pending} type="submit">{ buttonLabel }</Button>
  )
}
