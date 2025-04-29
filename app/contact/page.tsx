import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-10">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Have a question or want to work together? Feel free to reach out using the form below or through my contact
          information.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
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
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" placeholder="Subject" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Your message" rows={5} required />
            </div>
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-muted-foreground">nishad@example.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-muted-foreground">+1 (123) 456-7890</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Location</h3>
                  <p className="text-muted-foreground">Tempe, Arizona</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
