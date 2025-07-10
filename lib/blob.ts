import { put, del, list } from "@vercel/blob"

export async function uploadImage(file: File): Promise<string> {
  try {
    const blob = await put(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    })

    return blob.url
  } catch (error) {
    console.error("Upload failed:", error)
    throw new Error("Failed to upload image")
  }
}

export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Delete failed:", error)
    throw new Error("Failed to delete image")
  }
}

export async function listImages() {
  try {
    const { blobs } = await list()
    return blobs
  } catch (error) {
    console.error("List failed:", error)
    return []
  }
}
