import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Devices() {
  const devices = [
    {
      deviceId: "1",
      name: "Alahi",
      status: "Active",
      events: "10",
      lastUpdate: "2021-09-24 10:00:00",
    },
    {
      deviceId: "2",
      name: "Mijan",
      status: "Active",
      events: "5",
      lastUpdate: "2021-09-24 10:00:00",
    },
    {
      deviceId: "3",
      name: "Sayeed",
      status: "Active",
      events: "15",
      lastUpdate: "2021-09-24 10:00:00",
    },
    {
      deviceId: "4",
      name: "Junayed",
      status: "Active",
      events: "3",
      lastUpdate: "2021-09-24 10:00:00",
    },
    {
      deviceId: "5",
      name: "Karim",
      status: "Active",
      events: "20",
      lastUpdate: "2021-09-24 10:00:00",
    },
    {
      deviceId: "6",
      name: "Tonmoy",
      status: "Inactive",
      events: "1",
      lastUpdate: "2021-09-24 10:00:00",
    },
    {
      deviceId: "7",
      name: "Foisal",
      status: "Active",
      events: "8",
      lastUpdate: "2021-09-24 10:00:00",
    },
  ];

  return (
    <div className="relative top-4 mx-10 mb-10 rounded-3xl bg-white p-4 pt-5 shadow-2xl">
      <div className="relative left-5 text-xl font-bold">Devices</div>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="font-serif uppercase">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Events (last 7 days)</TableHead>
              <TableHead className="text-right">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.deviceId}>
                <TableCell>{device.name}</TableCell>
                <TableCell>
                  {device.status === "Active" ? (
                    <Badge>{device.status}</Badge>
                  ) : (
                    <Badge variant="outline">{device.status}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">{device.events}</TableCell>
                <TableCell className="text-right">
                  {device.lastUpdate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
