import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserX, ArrowLeft } from "lucide-react"

export default function UserNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <UserX className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          User Not Found
        </h1>
        <p className="text-slate-600 mb-6">
          The user you are looking for does not exist or has been deleted.
        </p>
        <Link href="/admin/users">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </Link>
      </div>
    </div>
  )
}
