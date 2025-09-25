"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export type ImagePosition = "left" | "right" | "top" | "bottom" | "none"

export type ImageData = {
  src: string
  alt?: string
  caption?: string
  type?: "image"
}
export type VideoData = {
  src: string
  alt?: string
  caption?: string
  poster?: string
  type?: "video"
}

export type MediaData = ImageData | VideoData

export type ProjectSectionProps = {
  title: string
  content: string
  image?: string
  imageAlt?: string
  singleImageCaption?: string
  images?: ImageData[]
  imagePosition?: ImagePosition
  projectTitle?: string
  videos?: VideoData[]
  media?: MediaData[] // <- actually supported now
}

export const ProjectSection = ({
  title,
  content,
  image,
  imageAlt = "Project image",
  singleImageCaption,
  videos,
  images,
  imagePosition = "bottom",
  projectTitle = "",
  media: mediaProp
}: ProjectSectionProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)

  // Prefer explicit media prop if provided; else build from images + videos
  const media: MediaData[] =
    (mediaProp && mediaProp.length > 0)
      ? mediaProp.map(m => (m.type ? m : ({ ...m, type: "image" }))) // default images if missing type
      : [
          ...(images?.map(item => ({ ...item, type: "image" as const })) || []),
          ...(videos?.map(item => ({ ...item, type: "video" as const })) || [])
        ]

  const isCarousel = media.length > 0
  const hasMedia = Boolean(image) || isCarousel

  const renderContent = () => (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown components={{ a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} /> }}>
        {content}
      </ReactMarkdown>
    </div>
  )

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
        {singleImageCaption && (
          <div className="mt-2 text-sm prose prose-gray italic text-center">
            {singleImageCaption}
          </div>
        )}
      </div>
    )
  }

  const renderCarouselPreview = () => {
    if (!isCarousel) return null
    const currentMedia = media[currentCarouselIndex]

    const openLightboxAt = (idx: number) => {
      setCurrentIndex(idx)
      setLightboxOpen(true)
    }

    return (
      <div className="relative">
        <div className="cursor-pointer transition-transform hover:scale-[1.02] duration-300 flex items-center justify-center">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.src}
              alt={currentMedia.alt || `${projectTitle} - ${title}`}
              className="w-full rounded-lg shadow-md object-cover"
              onClick={() => openLightboxAt(currentCarouselIndex)}
            />
          ) : (
            <video
              src={currentMedia.src}
              poster={"poster" in currentMedia ? currentMedia.poster : undefined}
              className="w-[60%] rounded-lg shadow-md object-cover"
              onClick={() => openLightboxAt(currentCarouselIndex)}
              // Preview reliability: show controls so autoplay failures aren't blank
              controls
              muted
              playsInline
              preload="metadata"
              autoPlay
              loop
            />
          )}
        </div>

        {currentMedia.caption && (
          <div className="mt-2 text-sm prose prose-gray italic text-center">
            {currentMedia.caption}
          </div>
        )}

        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentCarouselIndex(prev => (prev === 0 ? media.length - 1 : prev - 1))
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentCarouselIndex(prev => (prev === media.length - 1 ? 0 : prev + 1))
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {media.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentCarouselIndex ? "bg-gray-800" : "bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderMedia = () => {
    if (!hasMedia) return null
    return isCarousel ? renderCarouselPreview() : renderSingleImage()
  }

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

  const goToPrevious = () => {
    if (isCarousel) setCurrentIndex(prev => (prev === 0 ? media.length - 1 : prev - 1))
  }
  const goToNext = () => {
    if (isCarousel) setCurrentIndex(prev => (prev === media.length - 1 ? 0 : prev + 1))
  }

  // Reliable keyboard handling: bind while lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape") setLightboxOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxOpen])

  return (
    <div>
      {renderLayout()}

      {lightboxOpen && hasMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-screen-xl max-h-screen overflow-auto relative" onClick={(e) => e.stopPropagation()}>
            {!isCarousel && image && (
              <div className="relative">
                <img
                  src={image}
                  alt={imageAlt || `${projectTitle} - ${title}`}
                  className="max-w-full max-h-[90vh] mx-auto object-contain"
                />
                {singleImageCaption && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg text-center">
                    {singleImageCaption}
                  </div>
                )}
              </div>
            )}

            {isCarousel && (
              <>
                <div className="relative">
                  {media[currentIndex].type === "image" ? (
                    <img
                      src={media[currentIndex].src}
                      alt={media[currentIndex].alt || `${projectTitle} - ${title}`}
                      className="max-w-full max-h-[90vh] mx-auto object-contain"
                    />
                  ) : (
                    <video
                      src={media[currentIndex].src}
                      poster={"poster" in media[currentIndex] ? (media[currentIndex] as VideoData).poster : undefined}
                      className="max-w-full max-h-[90vh] mx-auto object-contain"
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                  )}

                  {media.length > 1 && (
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

                  {media.length > 1 && (
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentIndex + 1} / {media.length}
                    </div>
                  )}
                </div>
                
                {media[currentIndex].caption && (
                  <div className="mt-4 text-sm prose prose-gray italic text-center border border-gray-700 p-2 rounded-lg bg-gray-100">
                    {media[currentIndex].caption}
                  </div>
                )}
              </>
            )}


          </div>
        </div>
      )}
    </div>
  )
}
