"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { X } from "lucide-react"

export type ImagePosition = "left" | "right" | "top" | "bottom" | "none"

export type ProjectSectionProps = {
  title: string
  content: string
  image?: string
  imageAlt?: string
  imagePosition?: ImagePosition
  projectTitle?: string
}

export const ProjectSection = ({
  title,
  content,
  image,
  imageAlt = "Project image",
  imagePosition = "bottom",
  projectTitle = "",
}: ProjectSectionProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Helper to render the markdown content
  const renderContent = () => (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )

  // Helper to render the image with click handler
  const renderImage = () => {
    if (!image) return null
    
    return (
      <div className="cursor-pointer transition-transform hover:scale-[1.02] duration-300">
        <img
          src={image || "/placeholder.svg"}
          alt={imageAlt || `${projectTitle} - ${title}`}
          className="w-full rounded-lg shadow-md object-cover"
          onClick={() => setLightboxOpen(true)}
        />
      </div>
    )
  }

  // Layout components based on image position
  const renderLayout = () => {
    switch (imagePosition) {
      case "left":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="md:order-1">{renderImage()}</div>
            <div className="md:order-2">{renderContent()}</div>
          </div>
        )
      case "right":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="md:order-1">{renderContent()}</div>
            <div className="md:order-2">{renderImage()}</div>
          </div>
        )
      case "top":
        return (
          <div className="flex flex-col gap-6">
            {renderImage()}
            {renderContent()}
          </div>
        )
      case "bottom":
        return (
          <div className="flex flex-col gap-6">
            {renderContent()}
            {renderImage()}
          </div>
        )
      case "none":
      default:
        return <div>{renderContent()}</div>
    }
  }

  return (
    <div>
      {renderLayout()}

      {/* Lightbox */}
      {lightboxOpen && image && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-screen-xl max-h-screen overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img 
              src={image} 
              alt={imageAlt || `${projectTitle} - ${title}`}
              className="max-w-full max-h-[90vh] mx-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}