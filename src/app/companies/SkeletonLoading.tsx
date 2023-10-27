import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SkeletonLoading() {
  return (
    <div className='flex flex-col min-h-screen p-3 items-center gap-3'>
        <Skeleton className='h-12 w-1/2' />
        <Skeleton className='h-12 w-3/4' />
        <Skeleton className='h-12 w-3/4' />
    </div>
  )
}
