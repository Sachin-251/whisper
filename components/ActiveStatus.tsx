"use client";

//@ts-ignore
import useActiveChannel from "@/app/hooks/useActiveChannel";

const ActiveStatus = () => {
  useActiveChannel();

  return null;
};

export default ActiveStatus;