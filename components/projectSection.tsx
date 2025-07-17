"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export type ImagePosition = "left" | "right" | "top" | "bottom" | "none"

export type ImageData = {
  src: string
  alt?: string
  caption?: string
}

export type ProjectSectionProps = {
  title: string
  content: string
  image?: string
  imageAlt?: string
  singleImageCaption?: string  // New field for single image caption
  images?: ImageData[]
  imagePosition?: ImagePosition
  projectTitle?: string
}

export const ProjectSection = ({
  title,
  content,
  image,
  imageAlt = "Project image",
  singleImageCaption,  // Add the new prop here
  images,
  imagePosition = "bottom",
  projectTitle = "",
}: ProjectSectionProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)

  // Determine if we're using single image or carousel
  const isCarousel = images && images.length > 0
  const hasMedia = image || isCarousel

  // Helper to render the markdown content
  const renderContent = () => (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )

  // Helper to render single image with click handler
  const renderSingleImage = () => {
    if (!image) return null
    
    return (
      <div className="relative">
        <div className="cursor-pointer transition-transform hover:scale-[1.02] duration-300">
          <img
            src={image}
            alt={imageAlt || `${projectTitle} - ${title}`}
            className="w-full rounded-lg shadow-md object-cover"
            onClick={() => setLightboxOpen(true)}
          />
        </div>
        
        {/* Single image caption */}
        {singleImageCaption && (
          <div className="mt-2 text-sm prose prose-gray italic text-center">
            {singleImageCaption}
          </div>
        )}
      </div>
    )
  }

  // Helper to render carousel preview
  const renderCarouselPreview = () => {
    if (!images || images.length === 0) return null

    return (
      <div className="relative">
        <div className="cursor-pointer transition-transform hover:scale-[1.02] duration-300">
          <img
            src={images[currentCarouselIndex].src}
            alt={images[currentCarouselIndex].alt || `${projectTitle} - ${title}`}
            className="w-full rounded-lg shadow-md object-cover"
            onClick={() => {
              setCurrentImageIndex(currentCarouselIndex)
              setLightboxOpen(true)
            }}
          />
        </div>
        
        {/* Carousel caption in preview */}
        {images[currentCarouselIndex].caption && (
          <div className="mt-2 text-sm prose prose-gray italic text-center">
            {images[currentCarouselIndex].caption}
          </div>
        )}
        
        {/* Navigation arrows for preview */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentCarouselIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentCarouselIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        
        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentCarouselIndex ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Helper to render media (either single image or carousel)
  const renderMedia = () => {
    if (!hasMedia) return null
    
    return isCarousel ? renderCarouselPreview() : renderSingleImage()
  }

  // Layout components based on image position
  const renderLayout = () => {
    switch (imagePosition) {
      case "left":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="md:order-1">{renderMedia()}</div>
            <div className="md:order-2">{renderContent()}</div>
          </div>
        )
      case "right":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="md:order-1">{renderContent()}</div>
            <div className="md:order-2">{renderMedia()}</div>
          </div>
        )
      case "top":
        return (
          <div className="flex flex-col gap-6">
            {renderMedia()}
            {renderContent()}
          </div>
        )
      case "bottom":
        return (
          <div className="flex flex-col gap-6">
            {renderContent()}
            {renderMedia()}
          </div>
        )
      case "none":
      default:
        return <div>{renderContent()}</div>
    }
  }

  // Navigate to previous image in lightbox
  const goToPrevious = () => {
    if (isCarousel && images) {
      setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
    }
  }

  // Navigate to next image in lightbox
  const goToNext = () => {
    if (isCarousel && images) {
      setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape') setLightboxOpen(false)
  }

  return (
    <div>
      {renderLayout()}

      {/* Lightbox */}
      {lightboxOpen && hasMedia && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightboxOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-screen-xl max-h-screen overflow-auto relative" onClick={(e) => e.stopPropagation()}>
            {/* Single image lightbox */}
            {!isCarousel && image && (
              <div className="relative">
                <img 
                  src={image} 
                  alt={imageAlt || `${projectTitle} - ${title}`}
                  className="max-w-full max-h-[90vh] mx-auto object-contain"
                />
                
                {/* Single image caption in lightbox */}
                {singleImageCaption && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg text-center">
                    {singleImageCaption}
                  </div>
                )}
              </div>
            )}

            {/* Carousel lightbox */}
            {isCarousel && images && (
              <div className="relative">
                <img 
                  src={images[currentImageIndex].src} 
                  alt={images[currentImageIndex].alt || `${projectTitle} - ${title}`}
                  className="max-w-full max-h-[90vh] mx-auto object-contain"
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Caption */}
                {images[currentImageIndex].caption && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg text-center">
                    {images[currentImageIndex].caption}
                  </div>
                )}

                {/* Image counter */}
                {images.length > 1 && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}