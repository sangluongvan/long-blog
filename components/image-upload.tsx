"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string
}

export function ImageUpload({ onUpload, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)

  const handleUpload = async (file: File) => {
    setUploading(true)

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const blob = await response.json()
      setPreview(blob.url)
      onUpload(blob.url)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed!")
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        handleUpload(file)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
          <Button
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => {
              setPreview("")
              onUpload("")
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400"
          onClick={handleFileSelect}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">Click để chọn ảnh</p>
        </div>
      )}

      <Button onClick={handleFileSelect} disabled={uploading} className="w-full">
        {uploading ? "Đang tải..." : "Chọn ảnh mới"}
      </Button>
    </div>
  )
}
