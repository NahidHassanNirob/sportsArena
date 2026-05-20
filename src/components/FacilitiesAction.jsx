"use client";

import {EllipsisVertical, Pencil, SquarePlus, TrashBin} from "@gravity-ui/icons";
import {Button, Description, Dropdown, Header, Kbd, Label, Separator} from "@heroui/react";

export function FacilitiesAction() {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" >
        <EllipsisVertical className="outline-none" />
      </Button>
      <Dropdown.Popover className="bg-[#111627]">
        <Dropdown.Menu  onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Header>Actions</Header>
           
            <Dropdown.Item className="" id="update" textValue="update">
              <div className="flex h-8 items-start justify-center pt-px">
                <Pencil className="size-4 shrink-0 text-muted" />
              </div>
              <div className="flex flex-col">
                <Label className="text-gray-400 hover:text-black">Update</Label>
                <Description>Make changes</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>U</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Danger zone</Header>
            <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
              <div className="flex h-8 items-start justify-center pt-px">
                <TrashBin className="size-4 shrink-0 text-danger" />
              </div>
              <div className="flex flex-col">
                <Label>Delete file</Label>
                <Description>Move to trash</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Abbr keyValue="shift" />
                <Kbd.Content>D</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}