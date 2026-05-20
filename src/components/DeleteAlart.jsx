"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";

export function DeleteAlart({ isOpen, onClose, onConfirm }) {
  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onClose}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#111627] border border-gray-800 text-white p-6 rounded-xl">
            <AlertDialog.CloseTrigger className="text-gray-400 hover:text-white" />
            <AlertDialog.Header className="flex items-center gap-3">
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-xl font-bold text-gray-100">
                Delete permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="mt-3">
              <p className="text-gray-400 text-sm leading-relaxed">
                This will permanently delete this facility and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex gap-3 justify-end mt-6">
              <Button 
                variant="light" 
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg px-4"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button 
                variant="solid" 
                className="bg-danger text-white font-medium rounded-lg px-4 hover:opacity-90"
                onPress={() => {
                  onConfirm(); 
                  onClose();   
                }}
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}