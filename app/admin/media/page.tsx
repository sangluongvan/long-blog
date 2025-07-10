"use client"

import React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Search,
  Grid3X3,
  List,
  Download,
  Trash2,
  Eye,
  ArrowLeft,
  Filter,
  FolderOpen,
  ImageIcon,
  Video,
  File,
  Plus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      name: "long-sleeping.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
      url: "/placeholder.svg?height=200&width=200",
      thumbnail: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "long-playing.mp4",
      type: "video",
      size: "15.2 MB",
      duration: "0:45",
      uploadDate: "2024-01-14",
      url: "/placeholder.svg?height=200&width=200",
      thumbnail: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "long-eating.jpg",
      type: "image",
      size: "1.8 MB",
      dimensions: "1280x720",
      uploadDate: "2024-01-13",
      url: "/placeholder.svg?height=200&width=200",
      thumbnail: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "long-portrait.jpg",
      type: "image",
      size: "3.1 MB",
      dimensions: "2048x1536",
      uploadDate: "2024-01-12",
      url: "/placeholder.svg?height=200&width=200",
      thumbnail: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 5,
      name: "long-running.mp4",
      type: "video",
      size: "22.7 MB",
      duration: "1:20",
      uploadDate: "2024-01-11",
      url: "/placeholder.svg?height=200&width=200",
      thumbnail: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 6,
      name: "long-sunbathing.jpg",
      type: "image",
      size: "2.9 MB",
      dimensions: "1920x1280",
      uploadDate: "2024-01-10",
      url: "/placeholder.svg?height=200&width=200",
      thumbnail: "/placeholder.svg?height=150&width=150",
    },
  ])

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || item.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const handleFileUpload = useCallback(async (files: FileList) => {
    setIsUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Create new media item
      const newItem = {
        id: Date.now() + i,
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "file",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        dimensions: file.type.startsWith("image/") ? "1920x1080" : undefined,
        duration: file.type.startsWith("video/") ? "1:30" : undefined,
        uploadDate: new Date().toISOString().split("T")[0],
        url: URL.createObjectURL(file),
        thumbnail: URL.createObjectURL(file),
      }

      setMediaItems((prev) => [newItem, ...prev])
    }

    setIsUploading(false)
    setUploadProgress(0)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFileUpload(files)
      }
    },
    [handleFileUpload],
  )

  const handleFileSelect = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = "image/*,video/*"
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files) {
        handleFileUpload(files)
      }
    }
    input.click()
  }

  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const deleteSelectedItems = () => {
    if (confirm(`Bạn có chắc muốn xóa ${selectedItems.length} file đã chọn?`)) {
      setMediaItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
      setSelectedItems([])
    }
  }

  const deleteItem = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa file này?")) {
      setMediaItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon
      case "video":
        return Video
      default:
        return File
    }
  }

  const renderGridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {filteredItems.map((item) => {
        const FileIcon = getFileIcon(item.type)
        const isSelected = selectedItems.includes(item.id)

        return (
          <Card
            key={item.id}
            className={`group hover:shadow-xl transition-all cursor-pointer border-2 ${
              isSelected ? "border-orange-500 bg-orange-50" : "border-transparent hover:border-gray-200"
            }`}
            onClick={() => toggleItemSelection(item.id)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square">
                {item.type === "image" ? (
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
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

                {/* Video Play Button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all rounded-t-lg">
                    <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-4 border-l-gray-700 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                  <Button
                    size="sm"
                    className="w-8 h-8 p-0 bg-white text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(item.url, "_blank")
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="w-8 h-8 p-0 bg-white text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Download functionality
                      const link = document.createElement("a")
                      link.href = item.url
                      link.download = item.name
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
                      deleteItem(item.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                  <span className="text-xs text-gray-500">{item.size}</span>
                </div>
                {item.dimensions && <p className="text-xs text-gray-400 mt-1">{item.dimensions}</p>}
                {item.duration && <p className="text-xs text-gray-400 mt-1">{item.duration}</p>}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const renderListView = () => (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredItems.map((item) => item.id))
                      } else {
                        setSelectedItems([])
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên file
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kích thước
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tải
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedItems.includes(item.id) ? "bg-orange-50" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {item.type === "image" ? (
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                            {React.createElement(getFileIcon(item.type), { className: "h-5 w-5 text-gray-400" })}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        {item.dimensions && <div className="text-sm text-gray-500">{item.dimensions}</div>}
                        {item.duration && <div className="text-sm text-gray-500">{item.duration}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline">{item.type}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.uploadDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => window.open(item.url, "_blank")}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = item.url
                          link.download = item.name
                          link.click()
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => deleteItem(item.id)}
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
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Thư viện Media</h1>
                  <p className="text-sm text-gray-500">Quản lý ảnh và video của Long</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {selectedItems.length > 0 && (
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 bg-transparent"
                  onClick={deleteSelectedItems}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xóa {selectedItems.length} file
                </Button>
              )}
              <Button
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg"
                onClick={handleFileSelect}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang tải...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Tải lên file
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Upload Progress */}
          {isUploading && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Đang tải lên...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters and Controls */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm file..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-green-300 focus:ring-green-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:border-green-300 focus:ring-green-200 focus:ring-2 focus:ring-opacity-20"
                    >
                      <option value="all">Tất cả ({mediaItems.length})</option>
                      <option value="image">Ảnh ({mediaItems.filter((i) => i.type === "image").length})</option>
                      <option value="video">Video ({mediaItems.filter((i) => i.type === "video").length})</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Lọc
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-gradient-to-r from-green-500 to-blue-500" : ""}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-gradient-to-r from-green-500 to-blue-500" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Content */}
          {filteredItems.length > 0 ? (
            viewMode === "grid" ? (
              renderGridView()
            ) : (
              renderListView()
            )
          ) : (
            <div className="text-center py-20">
              <FolderOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? "Không tìm thấy file nào" : "Chưa có file nào"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Tải lên file đầu tiên để bắt đầu"}
              </p>
              {!searchTerm && (
                <Button className="bg-gradient-to-r from-green-500 to-blue-500" onClick={handleFileSelect}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tải lên file đầu tiên
                </Button>
              )}
            </div>
          )}

          {/* Drag & Drop Upload Area */}
          <Card
            className="border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleFileSelect}
          >
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tải lên file mới</h3>
              <p className="text-gray-600 mb-4">Kéo thả file vào đây hoặc click để chọn</p>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Chọn file
              </Button>
              <p className="text-sm text-gray-500 mt-4">Hỗ trợ: JPG, PNG, GIF, MP4, MOV, PDF (tối đa 50MB mỗi file)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
