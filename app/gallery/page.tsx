"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Heart, Download, Filter } from "lucide-react"

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const mediaItems = [
    {
      id: 1,
      type: "image",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long đang ngủ",
      description: "Tư thế ngủ siêu đáng yêu",
      likes: 45,
      category: "daily",
    },
    {
      id: 2,
      type: "video",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long chơi với bóng len",
      description: "Video vui nhộn 30 giây",
      likes: 67,
      category: "playing",
    },
    {
      id: 3,
      type: "image",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long ăn cơm",
      description: "Bữa sáng ngon lành",
      likes: 32,
      category: "eating",
    },
    {
      id: 4,
      type: "image",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long trên cây cào",
      description: "Tập thể dục hàng ngày",
      likes: 28,
      category: "exercise",
    },
    {
      id: 5,
      type: "video",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long chạy quanh nhà",
      description: "Năng lượng tràn đầy",
      likes: 89,
      category: "playing",
    },
    {
      id: 6,
      type: "image",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long nhìn ra cửa sổ",
      description: "Quan sát thế giới bên ngoài",
      likes: 41,
      category: "daily",
    },
    {
      id: 7,
      type: "image",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long với đồ chơi mới",
      description: "Khám phá món quà mới",
      likes: 55,
      category: "playing",
    },
    {
      id: 8,
      type: "video",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long tắm nắng",
      description: "Thư giãn dưới ánh nắng",
      likes: 73,
      category: "daily",
    },
    {
      id: 9,
      type: "image",
      src: "/placeholder.svg?height=300&width=300",
      title: "Long và bạn bè",
      description: "Gặp gỡ những người bạn mới",
      likes: 62,
      category: "social",
    },
  ]

  const filteredItems =
    selectedFilter === "all" ? mediaItems : mediaItems.filter((item) => item.type === selectedFilter)

  const imageCount = mediaItems.filter((item) => item.type === "image").length
  const videoCount = mediaItems.filter((item) => item.type === "video").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🐱</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Thư viện của Long</h1>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Thư viện ảnh & video</h1>
          <p className="text-xl opacity-90">Những khoảnh khắc đẹp nhất của Long được lưu giữ</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-4">
            <Button
              className={
                selectedFilter === "all"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "border-orange-200 text-gray-600 hover:bg-orange-50 bg-transparent"
              }
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
            >
              <Filter className="mr-2 h-4 w-4" />
              Tất cả ({mediaItems.length})
            </Button>
            <Button
              variant={selectedFilter === "image" ? "default" : "outline"}
              className={
                selectedFilter === "image"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "border-orange-200 text-gray-600 hover:bg-orange-50 bg-transparent"
              }
              onClick={() => setSelectedFilter("image")}
            >
              📸 Ảnh ({imageCount})
            </Button>
            <Button
              variant={selectedFilter === "video" ? "default" : "outline"}
              className={
                selectedFilter === "video"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "border-orange-200 text-gray-600 hover:bg-orange-50 bg-transparent"
              }
              onClick={() => setSelectedFilter("video")}
            >
              🎥 Video ({videoCount})
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />

                    {/* Video Play Button */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all">
                        <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <Play className="h-8 w-8 text-orange-500 ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === "video" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                        }`}
                      >
                        {item.type === "video" ? "🎥 Video" : "📸 Ảnh"}
                      </span>
                    </div>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                        <Button size="sm" className="w-10 h-10 p-0 bg-white text-gray-700 hover:bg-gray-100">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="w-10 h-10 p-0 bg-white text-gray-700 hover:bg-gray-100">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Media Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        {item.likes}
                      </div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {item.type === "video" ? "Video" : "Ảnh"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Không có {selectedFilter === "image" ? "ảnh" : "video"} nào
              </h3>
              <p className="text-gray-600">
                Chưa có {selectedFilter === "image" ? "ảnh" : "video"} nào trong danh mục này
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Load More */}
      {filteredItems.length > 0 && (
        <section className="py-8 px-4 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
          >
            Tải thêm {selectedFilter === "image" ? "ảnh" : selectedFilter === "video" ? "video" : "media"}
          </Button>
        </section>
      )}
    </div>
  )
}
