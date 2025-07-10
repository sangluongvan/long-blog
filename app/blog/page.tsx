"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import BlogContent from "./blog-content"

export default function BlogPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </Suspense>
  )
}
