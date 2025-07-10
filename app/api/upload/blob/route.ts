import { put, del, list } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    if (!request.body) {
      return NextResponse.json({ error: "File data is required" }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const uniqueFilename = `${timestamp}-${filename}`

    const blob = await put(uniqueFilename, request.body, {
      access: "public",
      addRandomSuffix: false,
    })

    // Get image dimensions if it's an image
    let width, height
    if (filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      try {
        const imageBuffer = await fetch(blob.url).then((r) => r.arrayBuffer())
        const dimensions = await getImageDimensions(imageBuffer)
        width = dimensions.width
        height = dimensions.height
      } catch (error) {
        console.log("Could not get image dimensions:", error)
      }
    }

    return NextResponse.json({
      url: blob.url,
      size: blob.size,
      width,
      height,
      uploadedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { blobs } = await list()

    const files = blobs.map((blob) => ({
      id: blob.url,
      url: blob.url,
      name: blob.pathname.split("/").pop() || "unknown",
      size: blob.size,
      type: getFileType(blob.pathname),
      uploadedAt: blob.uploadedAt,
    }))

    return NextResponse.json({ files })
  } catch (error) {
    console.error("List error:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}

// Helper function to get image dimensions
async function getImageDimensions(buffer: ArrayBuffer): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([buffer])
    const img = new Image()

    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }

    img.onerror = reject
    img.src = URL.createObjectURL(blob)
  })
}

function getFileType(pathname: string): string {
  const ext = pathname.split(".").pop()?.toLowerCase()

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
    case "mov":
      return "video/quicktime"
    default:
      return "application/octet-stream"
  }
}
