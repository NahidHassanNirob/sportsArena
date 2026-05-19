'use client'
import { authClient } from "@/lib/auth-client";
import {ArrowRightFromSquare, Gear, Persons} from "@gravity-ui/icons";
import {Avatar, Dropdown, Label} from "@heroui/react";

export function ProfileDropdown({user}) {
  console.log("user form dropdown",user);
  const {name,email,image,}=user;
  const handelSignout=async()=>{
    await authClient.signOut();
  }
  return (
    <Dropdown className=" relative">
      <Dropdown.Trigger className="rounded-full flex items-center gap-3">
        <Avatar>
          <Avatar.Image
            alt={`${name} image`}
            src={image}
          />
          <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
        </Avatar>
        <h2 className="text-white">{name}</h2>
      </Dropdown.Trigger>
      <Dropdown.Popover className='rounded-md absolute  z-50'>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={`${name} image`}
            src={image}
              />
              <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{name}</p>
              <p className="text-xs leading-none text-muted">{email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item href="/bookings" id="bookings" textValue="Dashboard">
            <Label>My Bookings</Label>
          </Dropdown.Item>
          <Dropdown.Item href="/add-facilities" id="add-facilities" textValue="Profile">
            <Label>Add Facility</Label>
          </Dropdown.Item>
          <Dropdown.Item href="/manage-facilities" id="manage-facilities" textValue="Profile">
            <Label>Manage My Facilities</Label>
          </Dropdown.Item>
        
          <Dropdown.Item onClick={()=>handelSignout()} id="logout" textValue="Logout" variant="danger">
            <div className="flex w-full items-center  gap-1">
              <ArrowRightFromSquare className=" text-danger" />
              <Label>Log Out</Label>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}