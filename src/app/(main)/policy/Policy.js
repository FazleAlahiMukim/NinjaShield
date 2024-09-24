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

  const initializePolicy = () => {
    setName(policy.name);
    setRisk(policy.risk);
    setAction(policy.action);
    setFileCategories(policy.fileCategories);
    setDataClasses(
      allDataClasses
        .filter((dataClass) => policy.dataClasses.includes(dataClass.dataId))
        .map((dataClass) => dataClass.name),
    );
    setDestinations(policy.destinations);
  };

  useEffect(() => {
    if (policy) {
      initializePolicy();
    }
  }, [policy]);

  const handleSavePolicy = async () => {
    const refactoredDataClasses = allDataClasses
      .filter((dataClass) => dataClasses.includes(dataClass.name))
      .map((dataClass) => dataClass.dataId);

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
      dataClasses: refactoredDataClasses,
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
    if (!policy) handleCancel();
  };

  const handleCancel = () => {
    if (policy) {
      initializePolicy();
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
      <DialogContent className="text-sm">
        <DialogHeader>
          <DialogTitle>Policy</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-start space-x-2">
            <span>1.</span>
            <div className="w-full space-y-2">
              <label htmlFor="name">Enter name</label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Policy name"
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b-2 border-gray-300 py-1 transition duration-300 ease-in-out focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span>2.</span>
            <div className="w-full">
              <label htmlFor="risk">Select risk</label>
              <RadioGroup
                value={risk}
                defaultValue="high"
                onValueChange={(value) => setRisk(value)}
                className="-mt-2 flex justify-center space-x-10"
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
              <div className="mt-5">
                <label htmlFor="action" className="text-xs">
                  Action
                </label>
                <Select
                  value={action}
                  onValueChange={(value) => setAction(value)}
                >
                  <SelectTrigger className="w-full border-gray-300 focus:border-purple-500">
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
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span>3.</span>
            <div className="w-full space-y-2">
              <label htmlFor="selectData">Select data</label>
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
          </div>

          <div className="flex items-start space-x-2">
            <span>4.</span>
            <div className="w-full space-y-2">
              <label htmlFor="destination">Select destination</label>
              <DropDownSelect
                allObjects={allDestinations}
                objects={destinations}
                setObjects={setDestinations}
                name="Destination"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSavePolicy}>Save</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
