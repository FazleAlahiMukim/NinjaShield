import { useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import { useAuth } from "@/lib/authApi";

export default function Bot({ onSave }) {
  const [text, setText] = useState("");
  const { user } = useUser();
  const { api } = useAuth();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text.length === 0) {
      return;
    }

    api
      .post("/api/chatbot", { prompt: text, userId: user.userId })
      .then((response) => {
        setText("");
        if (response.data) {
          toast.success(`Policy ${response.data.name} added successfully`);
          onSave(response.data);
        }
      })
      .catch((error) => {
        console.error("Bot error:", error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Image
            src="/images/robot.png"
            alt="Bot Logo"
            width="30"
            height="30"
            style={{ width: "auto", height: "auto" }}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ninja Bot</DialogTitle>
          <DialogDescription>
            Ninja Bot will create a policy based on your requirements
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full gap-2">
          <Textarea
            placeholder="Type your requirements here."
            value={text}
            onChange={handleTextChange}
          />
          <DialogClose asChild>
            <Button onClick={handleSubmit}>Create Policy</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
