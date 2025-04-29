import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Briefcase, GraduationCap, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-10">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-6">
          UX Designer and Engineer with over 4 years of experience creating and managing large-scale applications across
          multiple technologies.
        </p>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Resume
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-primary/10 rounded-full">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">UX Designer & Researcher</h3>
                  <p className="text-muted-foreground mb-2">LEI, Arizona State University | 2021 - Present</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Led UX design and research for three major applications</li>
                    <li>Scaled and automated design processes</li>
                    <li>Aligned UX designs with development workflows</li>
                    <li>Conducted comprehensive UX research with diverse user groups</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-primary/10 rounded-full">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Front-end Engineer</h3>
                  <p className="text-muted-foreground mb-2">Deloitte | 2019 - 2021</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Developed responsive web applications using modern JavaScript frameworks</li>
                    <li>Collaborated with UX designers to implement pixel-perfect interfaces</li>
                    <li>Architected maintainable, scalable front-end systems</li>
                    <li>Optimized application performance and accessibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Education</h2>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-primary/10 rounded-full">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">MS in User Experience</h3>
                  <p className="text-muted-foreground mb-2">Arizona State University, Tempe | 2019 - 2021</p>
                  <p className="text-muted-foreground">
                    Focused on user-centered design methodologies, interaction design, and usability research.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-primary/10 rounded-full">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Bachelor's in Electronics Engineering</h3>
                  <p className="text-muted-foreground mb-2">VJTI Mumbai | 2015 - 2019</p>
                  <p className="text-muted-foreground">
                    Studied electronics engineering with a focus on digital systems and computer architecture.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Skills & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">UX Design</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>User Research & Testing</li>
                  <li>Information Architecture</li>
                  <li>Wireframing & Prototyping</li>
                  <li>Design Systems</li>
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
                  <li>React, Next.js</li>
                  <li>HTML, CSS, Tailwind</li>
                  <li>Responsive Design</li>
                  <li>Performance Optimization</li>
                  <li>Version Control (Git)</li>
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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="italic mb-4">
                      "Nishad's ability to understand complex user needs and translate them into intuitive designs is
                      exceptional. Their technical background gives them a unique perspective that bridges the gap
                      between design and development."
                    </p>
                    <p className="font-bold">Dr. Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Director of Research, LEI at ASU</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="italic mb-4">
                      "Working with Nishad was a game-changer for our project. They not only created beautiful designs
                      but also understood the technical constraints and opportunities, resulting in a product that was
                      both visually stunning and technically sound."
                    </p>
                    <p className="font-bold">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Lead Developer, Deloitte</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="italic mb-4">
                      "Nishad's research-driven approach to UX design transformed how we think about our educational
                      applications. Their work has directly contributed to increased engagement and improved learning
                      outcomes for students."
                    </p>
                    <p className="font-bold">Professor Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Educational Technology Department, ASU</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
