import { AlertTriangle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportProblemPage() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-10">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Report a Problem</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Found an issue with the website? Please let me know so I can fix it as soon as possible.
        </p>
      </header>

      <div className="max-w-2xl">
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Please provide as much detail as possible to help me understand and resolve the issue quickly.
          </AlertDescription>
        </Alert>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input id="name" placeholder="Your name" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="Your email" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="problem-type" className="text-sm font-medium">
              Problem Type
            </label>
            <Select>
              <SelectTrigger id="problem-type">
                <SelectValue placeholder="Select problem type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug or Error</SelectItem>
                <SelectItem value="content">Content Issue</SelectItem>
                <SelectItem value="design">Design Problem</SelectItem>
                <SelectItem value="accessibility">Accessibility Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="page-url" className="text-sm font-medium">
              Page URL
            </label>
            <Input id="page-url" placeholder="https://example.com/page-with-issue" />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Problem Description
            </label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail. Include steps to reproduce if applicable."
              rows={5}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Submit Report
          </Button>
        </form>
      </div>
    </div>
  )
}
