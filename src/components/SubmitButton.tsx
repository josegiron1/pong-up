"use client"
import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from "react-dom";

export default function SubmitButton({ buttonLabel, disabled }: { buttonLabel: string, disabled?: boolean}) {
    const { pending } = useFormStatus()
  return (
    <Button aria-disabled={pending || disabled} type="submit">{ buttonLabel }</Button>
  )
}
