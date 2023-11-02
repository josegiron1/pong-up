"use client"
import React from 'react'
import { Button } from './ui/button'

export default function SubmitButton({ buttonLabel, disabled }: { buttonLabel: string, disabled?: boolean}) {
  return (
    <Button aria-disabled={disabled} type="submit">{ buttonLabel }</Button>
  )
}
