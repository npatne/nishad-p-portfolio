'use client'; // Needed for useState and event handlers

import { Mail, MapPin, Linkedin, ClipboardCopy, Check } from "lucide-react"; // Added Linkedin, ClipboardCopy, Check
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react"; // Added useState

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  const emailAddress = "nishadpux@gmail.com"; // Replace with your actual email
  const linkedInUrl = "https://www.linkedin.com/in/nishad-patne/"; // Replace with your actual LinkedIn URL
  const linkedInDisplay = "Connect on LinkedIn"; // Text for the LinkedIn link

  const copyToClipboard = (text: string, type: 'email' | 'linkedin') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000); // Reset after 2 seconds
      } else if (type === 'linkedin') {
        setCopiedLinkedIn(true);
        setTimeout(() => setCopiedLinkedIn(false), 2000); // Reset after 2 seconds
      }
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // Optionally, show an error message to the user
    });
  };

  return (
    <div className="min-h-screen py-12 px-6 md:px-10 md:max-w-5xl lg:max-w-7xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-5">Hellooo, wanna say hi?</h1>
        {/* Updated introductory text */}
        <p className="text-xl text-muted-foreground max-w-3xl">
          Feel free to reach out via email or connect with me on LinkedIn using the links below.
          I'm always open to new opportunities and collaborations!

    
        </p>
      </header>

      {/* Removed the entire form grid item */}
      {/* The grid now only has one column effectively, but we keep the structure for potential future additions */}
      <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto"> {/* Centered the remaining column */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            {/* Email Card with Copy Button */}
            <Card>
              <CardContent className="p-6 flex items-center justify-between gap-4"> {/* Use justify-between */}
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <a href={`mailto:${emailAddress}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {emailAddress}
                    </a>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(emailAddress, 'email')}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-white" /> : <ClipboardCopy className="h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>

            {/* LinkedIn Card with Copy Button */}
            <Card>
               <CardContent className="p-6 flex items-center justify-between gap-4"> {/* Use justify-between */}
                 <div className="flex items-center gap-4">
                   <div className="p-2 bg-primary/10 rounded-full">
                     <Linkedin className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-bold">LinkedIn</h3>
                     <a
                       href={linkedInUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-muted-foreground hover:text-primary transition-colors"
                     >
                       {linkedInDisplay}
                     </a>
                   </div>
                 </div>
                 <Button
                   variant="ghost"
                   size="icon"
                   onClick={() => copyToClipboard(linkedInUrl, 'linkedin')}
                   aria-label="Copy LinkedIn URL"
                 >
                   {copiedLinkedIn ? <Check className="h-4 w-4 text-green-600" /> : <ClipboardCopy className="h-4 w-4" />}
                 </Button>
               </CardContent>
             </Card>

            {/* Removed Phone Card */}
            {/* Removed Location Card */}

          </div>
        </div>
      </div>
    </div>
  );
}
