import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ClipLoader color={"#7C3AED"} size={50} />
    </div>
  );
}
