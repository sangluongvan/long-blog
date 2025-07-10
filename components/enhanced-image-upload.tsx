"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X, ImageIcon, AlertCircle, CheckCircle, Loader2, Camera, Download } from "lucide-react"
import { UploadManager, type UploadOptions } from "@/lib/upload-adapter"
import Image from "next/image"

interface EnhancedImageUploadProps {
  onUpload: (url: string, metadata?: any) => void
  onError?: (error: string) => void
  currentImage?: string
  options?: UploadOptions
  multiple?: boolean
  provider?: "vercel" | "cloudinary"
  className?: string
}

export function EnhancedImageUpload({
  onUpload,
  onError,
  currentImage,
  options = {},
  multiple = false,
  provider = "vercel",
  className = "",
}: EnhancedImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadManager = new UploadManager(provider)

  const handleFiles = useCallback(
    async (files: FileList) => {
      if (!files.length) return

      setError(null)
      setUploading(true)
      setProgress(0)

      try {
        const fileArray = Array.from(files)
        const results = []

        for (let i = 0; i < fileArray.length; i++) {
          const file = fileArray[i]

          // Update progress
          setProgress((i / fileArray.length) * 100)

          try {
            const result = await uploadManager.upload(file, {
              maxSize: 10 * 1024 * 1024, // 10MB
              allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
              quality: 0.8,
              resize: { width: 1920, height: 1080 },
              ...options,
            })

            results.push({
              file: file.name,
              url: result.url,
              size: result.size,
              dimensions: result.width && result.height ? `${result.width}x${result.height}` : null,
              ...result,
            })

            // Set preview for single upload
            if (!multiple) {
              setPreview(result.url)
              onUpload(result.url, result)
            }
          } catch (fileError) {
            console.error(`Error uploading ${file.name}:`, fileError)
            setError(`Lỗi upload ${file.name}: ${fileError instanceof Error ? fileError.message : "Unknown error"}`)
          }
        }

        if (multiple && results.length > 0) {
          setUploadedFiles((prev) => [...prev, ...results])
          onUpload("", results) // Pass all results for multiple upload
        }

        setProgress(100)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Upload failed"
        setError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setUploading(false)
        setTimeout(() => setProgress(0), 1000)
      }
    },
    [uploadManager, options, multiple, onUpload, onError],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)

      const files = e.dataTransfer.files
      if (files) {
        handleFiles(files)
      }
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files) {
        handleFiles(files)
      }
    },
    [handleFiles],
  )

  const removeImage = useCallback(() => {
    setPreview(null)
    setError(null)
    onUpload("", null)
  }, [onUpload])

  const removeUploadedFile = useCallback((index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Error Display */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
          <Button size="sm" variant="ghost" onClick={() => setError(null)} className="ml-auto h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Progress Bar */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Đang upload...</span>
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Single Image Preview */}
      {!multiple && preview && (
        <div className="relative group">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={() => window.open(preview, "_blank")}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={removeImage}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Multiple Files Preview */}
      {multiple && uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={file.url || "/placeholder.svg"}
                  alt={file.file}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />

                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={() => removeUploadedFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="mt-2 text-xs text-gray-600">
                <p className="truncate font-medium">{file.file}</p>
                <p className="text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(1)}MB
                  {file.dimensions && ` • ${file.dimensions}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {(!preview || multiple) && (
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
            ${
              dragActive
                ? "border-orange-400 bg-orange-50"
                : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
            }
            ${uploading ? "pointer-events-none opacity-50" : ""}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleFileSelect}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="space-y-4">
            <div
              className={`
              w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-200
              ${dragActive ? "bg-orange-500 scale-110" : "bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-110"}
            `}
            >
              {uploading ? (
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              ) : (
                <Upload className="h-8 w-8 text-white" />
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {dragActive ? "Thả file vào đây" : "Tải lên ảnh"}
              </h3>
              <p className="text-gray-600 mb-4">Kéo thả ảnh vào đây hoặc click để chọn</p>

              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  JPG, PNG, GIF, WebP
                </span>
                <span>•</span>
                <span>Tối đa 10MB</span>
                {multiple && (
                  <>
                    <span>•</span>
                    <span>Nhiều file</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={handleFileSelect}
          disabled={uploading}
          className="flex-1 sm:flex-none bg-transparent"
        >
          <Camera className="h-4 w-4 mr-2" />
          {multiple ? "Thêm ảnh" : "Chọn ảnh khác"}
        </Button>

        {preview && !multiple && (
          <Button variant="outline" onClick={() => window.open(preview, "_blank")} className="flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-2" />
            Tải xuống
          </Button>
        )}
      </div>

      {/* Upload Success */}
      {!uploading && (preview || uploadedFiles.length > 0) && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">Upload thành công {multiple ? `${uploadedFiles.length} file` : "1 file"}!</span>
        </div>
      )}
    </div>
  )
}
