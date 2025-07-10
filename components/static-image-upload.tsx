"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Upload } from "lucide-react"

export function StaticImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePath, setImagePath] = useState("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Generate path for manual upload
      const path = `/images/${file.name}`
      setImagePath(path)
    }
  }

  const copyPath = () => {
    navigator.clipboard.writeText(imagePath)
    alert("Đã copy path!")
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-2" />
          <span className="text-gray-600">Chọn ảnh để lấy path</span>
        </label>
      </div>

      {selectedFile && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            1. Upload file này vào folder: <code>public/images/</code>
          </p>
          <p className="text-sm text-gray-600 mb-2">2. Sử dụng path:</p>
          <div className="flex items-center space-x-2">
            <code className="bg-gray-200 px-2 py-1 rounded flex-1">{imagePath}</code>
            <Button size="sm" onClick={copyPath}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
