import { redirect } from "next/navigation"
import { getServerAuthContext } from "@/lib/server-auth"
import { DataUploadCenter } from "@/components/admin/data-upload-center"

export default async function DataUploadPage() {
  const auth = await getServerAuthContext()
  
  // Require authentication
  if (!auth) {
    redirect("/login")
  }
  
  // Only SUPER_ADMIN can access Data Upload Center
  if (auth.role !== "SUPER_ADMIN") {
    redirect("/admin")
  }
  
  return <DataUploadCenter auth={auth} />
}
