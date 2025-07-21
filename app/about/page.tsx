import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Briefcase, GraduationCap, Award } from "lucide-react"

// Define types for our data objects
type ExperienceItem = {
  title: string
  company: string
  period: string
  responsibilities: string[]
}

type EducationItem = {
  degree: string
  institution: string
  period: string
  description: string
}

type TestimonialItem = {
  quote: string
  name: string
  title: string
}

const experienceData: ExperienceItem[] = [
 {
   title: "UX Designer & Design Engineer",
   company: "Learning Engineering Institute, Arizona State University",
   period: "Feb 2023 - Present",
   responsibilities: [
     "Led strategic pivot replacing 3000+ cited software, architecting full-stack desktop solution",
     "Built Teacher Portal from scratch for K-12 EdTech platform supporting grant-funded research",
     "Designed scalable design systems across 3 applications, improving team efficiency by 50%",
     "Conducted 6 UX research initiatives while mentoring teams and contributing to academic papers",
     "Delivered 35% increase in engagement and 20% improvement in learning outcomes"
   ]
 },
 {
   title: "Front-End Developer",
   company: "Deloitte",
   period: "Jan 2021 - May 2022",
   responsibilities: [
     "Increased user onboarding by 30% through enterprise Salesforce application development",
     "Enhanced accessibility compliance by 30% achieving WCAG AA/AAA standards",
     "Boosted user retention by 60% rebuilding applications from legacy to modern frameworks",
     "Facilitated cross-border collaboration between US and India development teams"
   ]
 },
 {
   title: "AI-Powered Portfolio Chatbot",
   period: "Mar 2025 - June 2025",
   company: "Self Directed",
   responsibilities: [
     "Architected production RAG system using Gemini LLM and Qdrant Vector Database",
     "Transformed static portfolio into interactive conversational AI experience"
   ]
 },
 {
   title: "ToolTips Figma Plugin",
   company: "Self Directed",
   period: "Oct 2023 - Nov 2023",
   responsibilities: [
     "Launched Figma plugin gaining 5,500+ users and 300+ saves within months",
     "Demonstrated product-market fit through rapid community adoption"
   ]
 }
]

const educationData: EducationItem[] = [
  {
    degree: "MS in User Experience",
    institution: "Arizona State University, Tempe",
    period: "2022 - 2024",
    description: "Focused on user-centered design methodologies, interaction design, and usability research."
  },
  {
    degree: "Bachelor's in Electronics Engineering",
    institution: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    period: "2016 - 2020",
    description: "Studied electronics engineering with a focus on digital systems, statistics, and computer architecture."
  }
]

const testimonialData: TestimonialItem[] = [
  {
    "quote": "I've worked closely with Nishad and can confidently say he's an exceptional product specialist. His contributions significantly improved the Writing Analytics Tool (WAT) user experience, through rigorous testing, usability assessments, and style guide implementation. Nishad's technical skills, work ethic, and reliability make him highly recommendable.",
    "name": "Zeinab Serhan",
    "title": "Sr. Software Engineer, LEI, ASU"
  },
  {
    "quote": "Nishad's exceptional performance as both a student and grader sets him apart. In my UX course, his talent emerged in user-centric research and data-driven design. As a grader, he demonstrated dedication, offering valuable feedback to fellow students, fostering their growth and in integral part of the journey through the course.",
    "name": "Deborah Prewitt",
    "title": "MS in UX Program Chair, ASU"
  },
  {
    "quote": "Nishad's exceptional commitment, proactivity, and ability to handle multiple tasks within deadlines make him a valuable asset. His seamless collaboration and problem-solving skills translate functional needs into technical solutions effortlessly.",
    "name": "Neha Srivastava",
    "title": "Consultant, C&M, Deloitte"
  },
  {
    "quote": "Nishad has excellent UI developer skills. He has a very good attitude towards approaching a problem statement and taking it to completion. Nishad worked with me for 6 months and would like to have him again in my team.",
    "name": "Vaibhav Goel",
    "title": "Manager, Consulting, Deloitte"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-10 md:max-w-5xl 	lg:max-w-7xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-6">
          UX Designer and Engineer with over 4 years of experience creating and managing large-scale applications across
          multiple technologies.
        </p>
        <Button asChild>
          <a 
            href="https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/2025-8-nishad_anil_patne_resume.pdf" 
            download="Nishad_Patne_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </a>
        </Button>
      </header>

      <Tabs defaultValue="experience" className="mb-12">
        <TabsList className="mb-8">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Work Experience</h2>

          {experienceData.map((experience, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{experience.title}</h3>
                    <p className="text-muted-foreground mb-2">{experience.company} | {experience.period}</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {experience.responsibilities.map((responsibility, idx) => (
                        <li key={idx}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Education</h2>

          {educationData.map((education, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{education.degree}</h3>
                    <p className="text-muted-foreground mb-2">{education.institution} | {education.period}</p>
                    <p className="text-muted-foreground">
                      {education.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Skills & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">UX Design</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>UX Strategy and Process building</li>
                  <li>Information Architecture</li>
                  <li>Wireframing & Prototyping</li>
                  <li>Design Systems</li>
                  <li>UX Copy and Documentation</li>
                  <li>Accessibility</li>
                  <li>Figma, Sketch, Adobe XD</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Engineering</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>JavaScript/TypeScript</li>
                  <li>React, Next.js, LWC, Angular</li>
                  <li>HTML, CSS, Tailwind, Bootstrap</li>
                  <li>Salesforce, Django</li>
                  <li>Performance Optimization</li>
                  <li>Version Control (Git)</li>
                  <li>AI Tools and Technologies</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Research</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Qualitative & Quantitative Methods</li>
                  <li>Usability Testing</li>
                  <li>A/B Testing</li>
                  <li>Surveys & Interviews</li>
                  <li>Heuristic Evaluation</li>
                  <li>Data Analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Soft Skills</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Project Management</li>
                  <li>Team Leadership</li>
                  <li>Cross-functional Collaboration</li>
                  <li>Communication</li>
                  <li>Problem Solving</li>
                  <li>Adaptability</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Testimonials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonialData.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-primary/10 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
