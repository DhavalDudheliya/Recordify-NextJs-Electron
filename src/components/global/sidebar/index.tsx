import { Select } from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <p className="text-2xl">Recordify</p>
      </div>
      <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}></Select>
    </div>
  );
};

export default Sidebar;
