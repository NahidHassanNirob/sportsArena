// import { Button } from "@heroui/react";
'use client'
import { X } from "lucide-react";
import {AlertDialog, Button} from "@heroui/react";
import { deleteBooking } from "@/lib/data";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const CancelBookingBtn = ({id}) => {
  const router=useRouter()
 const handelCancle = async () => {
  const { data } = await authClient.token();
  if (!data?.token) return toast.error("Unauthorized");
  
  try {
    await deleteBooking(id, data.token);
    toast.success('Successfully cancelled');
    router.refresh();
  } catch (err) {
    console.error(err);
    toast.error("Failed to cancel booking");
  }
};
  return (
     <AlertDialog>
      <Button variant="danger">Cancle Booking</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container >
          <AlertDialog.Dialog className="sm:max-w-[400px] ">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete  and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              
              <Button onClick={()=>handelCancle(id)} slot="close" variant="danger">
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default CancelBookingBtn;
