import { Spinner } from "@/components/global/loader/spinner";
import React from "react";

type Props = {};

const AuthLoading = (props: Props) => {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <Spinner />
    </div>
  );
};

export default AuthLoading;
