"use client";

import { useState } from "react";
import { deleteFacilityById } from "@/lib/data";
import { EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import { Button, Description, Dropdown, Header, Kbd, Label, Separator } from "@heroui/react";
import { useRouter } from "next/navigation"; 
import { DeleteAlart } from "./DeleteAlart";
import toast from "react-hot-toast";

export function FacilitiesAction({ id }) {
  const router = useRouter();
  

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAction = (key) => {
    if (key === "update") {
      router.push(`/manage-facilities/update/${id}`);
    } else if (key === "delete") {
      setIsAlertOpen(true);
    }
  };

 
  const handleConfirmDelete = async () => {
    try {
      await deleteFacilityById(id);
      toast.success("Facility deleted successfully!");
      router.refresh(); 
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Could not delete the facility.");
    }
  };

  return (
    <>
      <Dropdown>
        <Button isIconOnly aria-label="Menu" variant="light" className="text-gray-400">
          <EllipsisVertical className="outline-none" />
        </Button>
        <Dropdown.Popover className="bg-[#111627] border border-gray-800 rounded-xl">
          <Dropdown.Menu className="p-2">
            
            
            <Dropdown.Section>
              <Header className="text-gray-500 text-xs px-2 mb-1">Actions</Header>
              
              <Dropdown.Item onClick={() => handleAction("update")} key="update" textValue="Update" className="hover:bg-gray-800/60 rounded-lg">
                <div className="flex items-center gap-3 w-full">
                  <div className="flex h-8 items-center justify-center pt-px">
                    <Pencil className="size-4 shrink-0 text-gray-400" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-gray-200">Update</Label>
                    <Description className="text-gray-500 text-xs">Make changes</Description>
                  </div>
                  <Kbd className="ms-auto bg-gray-800 border-none text-gray-400" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>U</Kbd.Content>
                  </Kbd>
                </div>
              </Dropdown.Item>
            </Dropdown.Section>

            <Separator className="bg-gray-800/60 my-1" />

           
            <Dropdown.Section>
              <Header className="text-gray-500 text-xs px-2 mb-1">Danger zone</Header>
              
              <Dropdown.Item onClick={() => handleAction('delete')} key="delete" textValue="Delete" className="hover:bg-danger/10 text-danger rounded-lg">
                <div className="flex items-center gap-3 w-full">
                  <div className="flex h-8 items-center justify-center pt-px">
                    <TrashBin className="size-4 shrink-0 text-danger" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="text-danger">Delete file</Label>
                    <Description className="text-gray-500 text-xs">Move to trash</Description>
                  </div>
                  <Kbd className="ms-auto bg-gray-800 border-none text-gray-400" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Abbr keyValue="shift" />
                    <Kbd.Content>D</Kbd.Content>
                  </Kbd>
                </div>
              </Dropdown.Item>
            </Dropdown.Section>

          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      
      <DeleteAlart 
        isOpen={isAlertOpen} 
        onClose={() => setIsAlertOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />
    </>
  );
}