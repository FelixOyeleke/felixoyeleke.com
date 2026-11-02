import { redirect } from "next/navigation";

export default function LegacyGpuNoteRedirect() {
  redirect("/notes/workstation-setup");
}
