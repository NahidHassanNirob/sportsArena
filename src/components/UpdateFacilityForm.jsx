"use client";

import React from "react";
import { Check } from "@gravity-ui/icons";
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { updateFacilityById } from "@/lib/data";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UpdateFacilityForm = ({ id, currentData }) => {
  const router = useRouter();

 const handleUpdate = async (e) => {
    e.preventDefault();
    
    // টোকেন নিন
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    const formData = new FormData(e.target);
    const updatedObject = Object.fromEntries(formData.entries());

    // টাইপ কনভার্সন করুন
    const finalData = {
        ...updatedObject,
        pricePerHour: Number(updatedObject.pricePerHour),
        capacity: Number(updatedObject.capacity),
        availableSlot: Number(updatedObject.availableSlot),
    };

    // টোকেনসহ আপডেট ফাংশন কল করুন
    const result = await updateFacilityById(id, finalData, token);

    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      toast.success("Facility updated successfully!");
      router.push("/manage-facilities"); 
      router.refresh();
    } else {
      toast.error("No changes made or update failed.");
    }
  };

  return (
    <Form
      onSubmit={handleUpdate}
      className="flex max-w-3xl my-5 rounded-xl mx-auto bg-[#111627] p-6 text-white flex-col gap-5 border border-gray-800"
    >
      <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">
        Update Facility
      </h2>

      {/* 🚀 লক্ষ্য করুন: defaultValue এখন TextField এর ওপর দেওয়া হয়েছে */}
      <TextField isRequired name="facilityName" type="text" defaultValue={currentData?.facilityName || ""}>
        <Label className="text-white mb-1.5 block text-sm">Facility Name</Label>
        <Input
          className="bg-[#0F171F] text-white"
          placeholder="Enter Facility Name"
        />
        <FieldError />
      </TextField>

      <TextField isRequired name="capacity" type="number" defaultValue={currentData?.capacity?.toString() || ""}>
        <Label className="text-white mb-1.5 block text-sm">Capacity (Persons)</Label>
        <Input
          className="bg-[#0F171F] text-white"
          placeholder="Enter Capacity"
          min={1}
        />
        <FieldError />
      </TextField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField isRequired name="location" type="text" defaultValue={currentData?.location || ""}>
          <Label className="text-white mb-1.5 block text-sm">Location</Label>
          <Input
            className="bg-[#0F171F] text-white"
            placeholder="Enter Location"
          />
          <FieldError />
        </TextField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField isRequired name="pricePerHour" type="number" defaultValue={currentData?.pricePerHour?.toString() || ""}>
          <Label className="text-white mb-1.5 block text-sm">Price Per Hour ($)</Label>
          <Input
            type="number"
            className="bg-[#0F171F] text-white"
            placeholder="Enter Price"
            min={0}
          />
          <FieldError />
        </TextField>
        <TextField isRequired name="availableSlot" type="number" defaultValue={currentData?.availableSlot?.toString() || ""}>
          <Label className="text-white mb-1.5 block text-sm">Available Slot</Label>
          <Input
            type="number"
            className="bg-[#0F171F] text-white"
            placeholder="Enter Available Slot"
            min={0}
          />
          <FieldError />
        </TextField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField isRequired name="openingTime" type="time" defaultValue={currentData?.openingTime || ""}>
          <Label className="text-white mb-1.5 block text-sm">Opening Time</Label>
          <Input 
            type="time" 
            className="bg-[#0F171F] text-white" 
          />
          <FieldError />
        </TextField>

        <TextField isRequired name="closingTime" type="time" defaultValue={currentData?.closingTime || ""}>
          <Label className="text-white mb-1.5 block text-sm">Closing Time</Label>
          <Input 
            type="time" 
            className="bg-[#0F171F] text-white" 
          />
          <FieldError />
        </TextField>
      </div>

      {/* textarea-র ক্ষেত্রে TextField এর ওপরেই দিতে হবে */}
      <TextField isRequired name="description" defaultValue={currentData?.description || ""}>
        <Label className="text-white mb-1.5 block text-sm">Description</Label>
        <textarea
          required
          name="description"
          rows={4}
          className="w-full bg-[#0F171F] text-white rounded-xl p-3 border border-transparent focus:border-cyan-500 outline-none text-sm resize-none"
          placeholder="Enter facility description..."
        />
        <FieldError />
      </TextField>

      <div className="flex gap-3 justify-end pt-2">
        <Button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-5 rounded-xl transition-colors"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-green-500 text-slate-900 font-bold px-6 rounded-xl transition-opacity hover:opacity-90"
        >
          <Check />
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default UpdateFacilityForm;