"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../actions";

export function LogOutButton() {
  return (
    <Button className="cursor-pointer" variant={"destructive"} onClick={async () => await logOut()}>
      LogOut
    </Button>
  )
}