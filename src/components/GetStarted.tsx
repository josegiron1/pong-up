"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function GetStarted() {
  return (
    <>
      <Link href="/sign-up">
        <Button>Get Started</Button>
      </Link>
      <Link href="/login">
        <Button className="bg-gray-700 px-8 py-3 rounded hover:bg-gray-600">
          Login to Ranking
        </Button>
      </Link>
    </>
  );
}
