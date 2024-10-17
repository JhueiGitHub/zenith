import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
  const profile = await initialProfile();

  // Redirect to the desktop
  return redirect("/desktop");
};

export default SetupPage;
