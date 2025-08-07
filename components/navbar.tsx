"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Navbar() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Signed out successfully",
        })
        router.push("/signin")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            iSupod
          </button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => router.push("/logs")}>
              <FileText className="h-4 w-4 mr-2" />
              Logs
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
