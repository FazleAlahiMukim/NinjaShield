import { useAuth } from "@/lib/authApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Request({ device }) {
  const { api } = useAuth();

  const handleAccept = async () => {
    device.status = "inactive";
    try {
      await api.post(`/api/device/approve`, device);
    } catch (error) {
      console.error("Device Accept error:", error);
    }
  };

  const handleReject = async () => {
    try {
      await api.post(`/api/device/reject`, device);
    } catch (error) {
      console.error("Device Reject error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Badge variant="secondary" className="capitalize">
            {device.status}
          </Badge>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept the request for this device?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <p>
            <strong>{device.name}</strong> with email{" "}
            <strong>{device.email}</strong> has registered to your account.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleAccept}>Yes</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleReject} variant="secondary">
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
