"use client";

import { useState } from "react";

export default function useDialog() {
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(open);

  return { success, open, setSuccess, setOpen };
}
