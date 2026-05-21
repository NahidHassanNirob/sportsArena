"use client";
import React from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
// import { authClient } from "@/lib/auth-client";
import { postFacilities } from "@/lib/data";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
const AddFacilitiesForm = ({ token }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  

  // e এর পাশাপাশি e.currentTarget এর বদলে সরাসরি e ব্যবহার করুন
  const handelSubmit = async (e) => {
    e.preventDefault();

    // HeroUI Form থেকে ডাটা পাওয়ার জন্য FormData এর বদলে সরাসরি e.target ব্যবহার করুন
    const data = new FormData(e.target);
    const fileInput = data.get("image");

    if (!fileInput || fileInput.size === 0) {
      return;
    }

    try {
      const imageFormData = new FormData();
      imageFormData.append("image", fileInput);

      const imagebbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imagebbKey}`,
        {
          method: "POST",
          body: imageFormData,
        },
      );

      const imgData = await response.json();

      if (imgData.success) {
        const imageUrl = imgData.data.url;
        const formDataObject = Object.fromEntries(data.entries());

        formDataObject.image = imageUrl;
        formDataObject.ownerEmail = user?.email || "";
        formDataObject.pricePerHour = Number(formDataObject.pricePerHour);
        formDataObject.capacity = Number(formDataObject.capacity);
        formDataObject.availableSlot = Number(formDataObject.availableSlot);
        formDataObject.booking_count = 0;

        await postFacilities(formDataObject, token);
        toast.success("successfully add");
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen px-4">
      <Form
        onSubmit={handelSubmit}
        className="flex max-w-3xl my-5 rounded-xl mx-auto bg-[#0D131F] p-6 text-white flex-col gap-5 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">
          Add New Facility
        </h2>

        <TextField isRequired name="facilityName" type="text">
          <Label className="text-white mb-1.5 block text-sm">
            Facility Name
          </Label>
          <Input
            className="bg-[#0F171F] text-white"
            placeholder="Enter Facility Name"
          />
          <FieldError />
        </TextField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField isRequired name="facilityType">
            <Label className="text-white mb-1.5 block text-sm">
              Facility Type
            </Label>
            <select
              required
              name="facilityType"
              className="w-full h-10 bg-[#0F171F] text-white rounded-xl px-3 border border-transparent focus:border-cyan-500 outline-none text-sm cursor-pointer"
            >
              <option value="" className="bg-[#0D131F] text-gray-400">
                Select Game Type
              </option>
              <option value="Football" className="bg-[#0D131F]">
                Football
              </option>
              <option value="Basketball" className="bg-[#0D131F]">
                Basketball
              </option>
              <option value="Tennis" className="bg-[#0D131F]">
                Tennis
              </option>
              <option value="Cricket" className="bg-[#0D131F]">
                Cricket
              </option>
              <option value="Badminton" className="bg-[#0D131F]">
                Badminton
              </option>
              <option value="Gym" className="bg-[#0D131F]">
                Gym & Fitness
              </option>
              <option value="Swimming" className="bg-[#0D131F]">
                Swimming
              </option>
            </select>
            <FieldError />
          </TextField>

          <TextField isRequired name="capacity" type="number">
            <Label className="text-white mb-1.5 block text-sm">
              Capacity (Persons)
            </Label>
            <Input
              className="bg-[#0F171F] text-white"
              placeholder="Enter Capacity"
              min={1}
            />
            <FieldError />
          </TextField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField isRequired name="location" type="text">
            <Label className="text-white mb-1.5 block text-sm">Location</Label>
            <Input
              className="bg-[#0F171F] text-white"
              placeholder="Enter Location"
            />
            <FieldError />
          </TextField>

          <div>
            <label className="text-white mb-1.5 block text-sm">
              Image Upload
            </label>
            <input
              required
              name="image"
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0F171F] file:text-white hover:file:bg-[#16222F] cursor-pointer bg-[#0F171F] p-1.5 rounded-xl border border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField isRequired name="pricePerHour" type="number">
            <Label className="text-white mb-1.5 block text-sm">
              Price Per Hour ($)
            </Label>
            <Input
              type="number"
              className="bg-[#0F171F] text-white"
              placeholder="Enter Price"
              min={0}
            />
            <FieldError />
          </TextField>
          <TextField isRequired name="availableSlot" type="number">
            <Label className="text-white mb-1.5 block text-sm">
              Available Slot
            </Label>
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
          <TextField isRequired name="openingTime" type="time">
            <Label className="text-white mb-1.5 block text-sm">
              Opening Time
            </Label>
            <Input type="time" className="bg-[#0F171F] text-white" />
            <FieldError />
          </TextField>

          <TextField isRequired name="closingTime" type="time">
            <Label className="text-white mb-1.5 block text-sm">
              Closing Time
            </Label>
            <Input type="time" className="bg-[#0F171F] text-white" />
            <FieldError />
          </TextField>
        </div>

        <TextField isRequired name="description">
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

        <div className="flex flex-col gap-1">
          <label className="text-gray-400 text-sm">Owner Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full h-10 bg-[#172230] text-gray-400 opacity-70 rounded-xl px-3 border border-gray-800 outline-none text-sm cursor-not-allowed"
          />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button
            type="reset"
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-5 rounded-xl transition-colors"
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-green-500 text-slate-900 font-bold px-6 rounded-xl transition-opacity hover:opacity-90"
          >
            <Check />
            Submit Facility
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddFacilitiesForm;
