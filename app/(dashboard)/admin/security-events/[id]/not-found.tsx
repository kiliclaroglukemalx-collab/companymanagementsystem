import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="p-4 bg-red-50 rounded-full">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          Security Event Not Found
        </h1>
        <p className="text-slate-600 max-w-md">
          The security event you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
      </div>
      
      <Link href="/admin/security-events">
        <Button className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Security Events
        </Button>
      </Link>
    </div>
  )
}
