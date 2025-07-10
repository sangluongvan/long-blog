"use client"

import React from "react"

import { useState, useEffect } from "react"
import { EnhancedImageUpload } from "./enhanced-image-upload"
import { UploadManager } from "@/lib/upload-adapter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Grid3X3, List, Search, Download, Trash2, Eye, ImageIcon, Video, File, Plus } from "lucide-react"
import Image from "next/image"

interface MediaFile {
  id: string
  url: string
  name: string
  size: number
  type: string
  uploadedAt: Date
  dimensions?: string
}

export function MediaGalleryEnhanced() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const uploadManager = new UploadManager("vercel")

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      setLoading(true)
      const fileList = await uploadManager.list()
      setFiles(fileList)
    } catch (error) {
      console.error("Failed to load files:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (url: string, metadata: any) => {
    if (metadata) {
      const newFile: MediaFile = {
        id: url,
        url,
        name: metadata.file || "uploaded-file",
        size: metadata.size || 0,
        type: getFileType(url),
        uploadedAt: new Date(),
        dimensions: metadata.dimensions,
      }
      setFiles((prev) => [newFile, ...prev])
    }
  }

  const handleDelete = async (fileId: string) => {
    if (!confirm("Bạn có chắc muốn xóa file này?")) return

    try {
      await uploadManager.delete(fileId)
      setFiles((prev) => prev.filter((f) => f.id !== fileId))
      setSelectedFiles((prev) => prev.filter((id) => id !== fileId))
    } catch (error) {
      console.error("Delete failed:", error)
      alert("Xóa file thất bại!")
    }
  }

  const handleBulkDelete = async () => {
    if (!selectedFiles.length) return
    if (!confirm(`Bạn có chắc muốn xóa ${selectedFiles.length} file đã chọn?`)) return

    try {
      await Promise.all(selectedFiles.map((id) => uploadManager.delete(id)))
      setFiles((prev) => prev.filter((f) => !selectedFiles.includes(f.id)))
      setSelectedFiles([])
    } catch (error) {
      console.error("Bulk delete failed:", error)
      alert("Xóa file thất bại!")
    }
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || file.type.startsWith(selectedFilter)
    return matchesSearch && matchesFilter
  })

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.startsWith("video/")) return Video
    return File
  }

  const getFileType = (url: string): string => {
    const ext = url.split(".").pop()?.toLowerCase()
    switch (ext) {
      case "jpg":
      case "jpeg":
        return "image/jpeg"
      case "png":
        return "image/png"
      case "gif":
        return "image/gif"
      case "webp":
        return "image/webp"
      case "mp4":
        return "video/mp4"
      default:
        return "application/octet-stream"
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Upload ảnh mới</h3>
        <EnhancedImageUpload
          onUpload={handleUpload}
          multiple={true}
          provider="vercel"
          options={{
            maxSize: 10 * 1024 * 1024,
            quality: 0.8,
            resize: { width: 1920 },
          }}
        />
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring-orange-200"
              >
                <option value="all">Tất cả ({files.length})</option>
                <option value="image">Ảnh ({files.filter((f) => f.type.startsWith("image/")).length})</option>
                <option value="video">Video ({files.filter((f) => f.type.startsWith("video/")).length})</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {selectedFiles.length > 0 && (
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa {selectedFiles.length} file
              </Button>
            )}

            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Files Display */}
      {filteredFiles.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredFiles.map((file) => {
              const FileIcon = getFileIcon(file.type)
              const isSelected = selectedFiles.includes(file.id)

              return (
                <div
                  key={file.id}
                  className={`group relative bg-white rounded-lg overflow-hidden shadow-sm border-2 transition-all cursor-pointer ${
                    isSelected ? "border-orange-500 bg-orange-50" : "border-transparent hover:border-gray-200"
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="relative aspect-square">
                    {file.type.startsWith("image/") ? (
                      <Image
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <FileIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}

                    {/* Selection Checkbox */}
                    <div
                      className={`absolute top-2 left-2 w-5 h-5 rounded border-2 transition-all ${
                        isSelected
                          ? "bg-orange-500 border-orange-500"
                          : "bg-white border-gray-300 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                      <Button
                        size="sm"
                        className="w-8 h-8 p-0 bg-white text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(file.url, "_blank")
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="w-8 h-8 p-0 bg-white text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          const link = document.createElement("a")
                          link.href = file.url
                          link.download = file.name
                          link.click()
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="w-8 h-8 p-0 bg-white text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(file.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {file.type.split("/")[0]}
                      </Badge>
                      <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                    </div>
                    {file.dimensions && <p className="text-xs text-gray-400 mt-1">{file.dimensions}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFiles(filteredFiles.map((f) => f.id))
                          } else {
                            setSelectedFiles([])
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFiles.map((file) => (
                    <tr
                      key={file.id}
                      className={`hover:bg-gray-50 ${selectedFiles.includes(file.id) ? "bg-orange-50" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => toggleFileSelection(file.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {file.type.startsWith("image/") ? (
                              <Image
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                                {React.createElement(getFileIcon(file.type), { className: "h-5 w-5 text-gray-400" })}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            {file.dimensions && <div className="text-sm text-gray-500">{file.dimensions}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{file.type.split("/")[0]}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatFileSize(file.size)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{file.uploadedAt.toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => window.open(file.url, "_blank")}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const link = document.createElement("a")
                              link.href = file.url
                              link.download = file.name
                              link.click()
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                            onClick={() => handleDelete(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <div className="text-center py-20">
          <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm ? "Không tìm thấy file nào" : "Chưa có file nào"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Upload file đầu tiên để bắt đầu"}
          </p>
          {!searchTerm && (
            <Button className="bg-gradient-to-r from-orange-500 to-pink-500">
              <Plus className="mr-2 h-4 w-4" />
              Upload file đầu tiên
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
