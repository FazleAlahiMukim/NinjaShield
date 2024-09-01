import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
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
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/authApi";
import { toast } from "sonner";
import Risk from "./Risk";
import Action from "./Action";
import DropDownSelect from "./DropDownSelect";

export default function Policy({
  policy,
  onSave,
  allDestinations,
  allFileCategories,
  allDataClasses,
}) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [risk, setRisk] = useState("high");
  const [action, setAction] = useState("block");
  const [fileCategories, setFileCategories] = useState([]);
  const [dataClasses, setDataClasses] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const { api } = useAuth();

  useEffect(() => {
    if (policy) {
      setName(policy.name);
      setRisk(policy.risk);
      setAction(policy.action);
      setFileCategories(policy.fileCategories);
      setDataClasses(policy.dataClasses);
      setDestinations(policy.destinations);
    }
  }, [policy]);

  const handleSavePolicy = async () => {
    const newPolicy = {
      policyId: policy?.policyId,
      userId: user.userId,
      isActive: true,
      name,
      risk,
      action,
      events: 0,
      lastUpdated: new Date(),
      fileCategories,
      dataClasses,
      destinations,
    };

    try {
      const response = await api.post(`/api/policy`, newPolicy);
      if (policy) toast.success(`Policy "${name}" updated successfully`);
      else toast.success(`Policy "${name}" added successfully`);
      onSave(response.data);
    } catch (error) {
      console.error("Policy Save error:", error);
    }
    handleCancel();
  };

  const handleCancel = () => {
    if (policy) {
      setName(policy.name);
      setRisk(policy.risk);
      setAction(policy.action);
      setFileCategories(policy.fileCategories);
      setDataClasses(policy.dataClasses);
      setDestinations(policy.destinations);
    } else {
      setName("");
      setRisk("high");
      setAction("block");
      setFileCategories([]);
      setDataClasses([]);
      setDestinations([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {policy ? (
          <Button
            variant="ghost"
            className="rounded bg-violet-100 p-2 hover:bg-purple-200"
          >
            {policy.name}
          </Button>
        ) : (
          <Button className="relative right-5">Add Policy</Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-full text-sm">
        <DialogHeader>
          <DialogTitle>Policy</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              1. Enter name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Policy name"
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-2 border-gray-300 transition duration-300 ease-in-out focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="risk" className="block font-medium text-gray-700">
              2. Select risk
            </label>
            <RadioGroup
              defaultValue="high"
              className="flex flex-row justify-center space-x-10"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Risk risk="high" />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Risk risk="low" />
              </div>
            </RadioGroup>
          </div>
          <div>
            <label htmlFor="action" className="block font-medium text-gray-700">
              Action
            </label>
            <Select value={action} onValueChange={(value) => setAction(value)}>
              <SelectTrigger className="w-[180px] border-gray-400 focus:border-purple-500">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="block">
                    <Action action={"block"} />
                  </SelectItem>
                  <SelectItem value="warn">
                    <Action action={"warn"} />
                  </SelectItem>
                  <SelectItem value="log">
                    <Action action={"log"} />
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="fileCategories"
              className="block font-medium text-gray-700"
            >
              3. Select data
            </label>
            <DropDownSelect
              allObjects={allFileCategories}
              objects={fileCategories}
              setObjects={setFileCategories}
              name="File category"
            />

            <DropDownSelect
              allObjects={allDataClasses}
              objects={dataClasses}
              setObjects={setDataClasses}
              name="Data classification"
            />
          </div>
          <div>
            <label
              htmlFor="fileCategories"
              className="block font-medium text-gray-700"
            >
              4. Select destination
            </label>
            <DropDownSelect
              allObjects={allDestinations}
              objects={destinations}
              setObjects={setDestinations}
              name="Destination"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSavePolicy}>Save</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleCancel}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
