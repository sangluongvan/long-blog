"use server"

import { revalidatePath } from "next/cache"

// Mock data storage (in real app this would be database)
const mockPosts = [
  {
    id: "1",
    title: "Ngày đầu tiên Long về nhà",
    content: "<p>Hôm nay là một ngày đặc biệt...</p>",
    excerpt: "Câu chuyện về ngày đầu tiên chú mèo nhỏ bé...",
    category: "Kỷ niệm",
    featured_image: "/placeholder.svg?height=400&width=800",
    status: "published",
    tags: ["Long", "Kỷ niệm"],
    author: "Admin",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
]

export async function createPost(formData: FormData) {
  try {
    const postData = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      excerpt: formData.get("excerpt") as string,
      category: formData.get("category") as string,
      featured_image: formData.get("featured_image") as string,
      status: formData.get("status") as string,
      tags: JSON.parse((formData.get("tags") as string) || "[]"),
      author: "Admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Simulate database save
    console.log("Creating post:", postData)

    revalidatePath("/blog")
    revalidatePath("/admin")

    return { success: true, post: postData }
  } catch (error) {
    return { success: false, error: "Failed to create post" }
  }
}

export async function updatePost(id: string, formData: FormData) {
  try {
    const postData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      excerpt: formData.get("excerpt") as string,
      category: formData.get("category") as string,
      featured_image: formData.get("featured_image") as string,
      status: formData.get("status") as string,
      tags: JSON.parse((formData.get("tags") as string) || "[]"),
      updated_at: new Date().toISOString(),
    }

    // Simulate database update
    console.log("Updating post:", id, postData)

    revalidatePath("/blog")
    revalidatePath("/admin")

    return { success: true, post: { id, ...postData } }
  } catch (error) {
    return { success: false, error: "Failed to update post" }
  }
}

export async function deletePost(id: string) {
  try {
    // Simulate database delete
    console.log("Deleting post:", id)

    revalidatePath("/blog")
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete post" }
  }
}
