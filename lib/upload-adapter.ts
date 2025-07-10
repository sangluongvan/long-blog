// Upload adapter pattern để support nhiều storage providers
export interface UploadAdapter {
  upload(file: File, options?: UploadOptions): Promise<UploadResult>
  delete(url: string): Promise<void>
  list(options?: ListOptions): Promise<UploadedFile[]>
}

export interface UploadOptions {
  folder?: string
  maxSize?: number
  allowedTypes?: string[]
  quality?: number
  resize?: {
    width?: number
    height?: number
  }
}

export interface UploadResult {
  url: string
  publicId?: string
  width?: number
  height?: number
  size: number
  format: string
}

export interface UploadedFile {
  id: string
  url: string
  name: string
  size: number
  type: string
  uploadedAt: Date
}

export interface ListOptions {
  folder?: string
  limit?: number
  offset?: number
}

// Vercel Blob Adapter
export class VercelBlobAdapter implements UploadAdapter {
  async upload(file: File, options: UploadOptions = {}): Promise<UploadResult> {
    // Validate file
    this.validateFile(file, options)

    // Optimize image if needed
    const optimizedFile = await this.optimizeImage(file, options)

    const response = await fetch(`/api/upload/blob?filename=${encodeURIComponent(file.name)}`, {
      method: "POST",
      body: optimizedFile,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const result = await response.json()
    return {
      url: result.url,
      size: optimizedFile.size,
      format: file.type,
      width: result.width,
      height: result.height,
    }
  }

  async delete(url: string): Promise<void> {
    await fetch("/api/upload/blob", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
  }

  async list(options: ListOptions = {}): Promise<UploadedFile[]> {
    const response = await fetch("/api/upload/blob/list")
    const data = await response.json()
    return data.files || []
  }

  private validateFile(file: File, options: UploadOptions) {
    const maxSize = options.maxSize || 10 * 1024 * 1024 // 10MB default
    const allowedTypes = options.allowedTypes || ["image/jpeg", "image/png", "image/gif", "image/webp"]

    if (file.size > maxSize) {
      throw new Error(`File quá lớn. Tối đa ${Math.round(maxSize / 1024 / 1024)}MB`)
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Định dạng không được hỗ trợ. Chỉ chấp nhận: ${allowedTypes.join(", ")}`)
    }
  }

  private async optimizeImage(file: File, options: UploadOptions): Promise<File> {
    if (!file.type.startsWith("image/")) return file

    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        const { width: targetWidth, height: targetHeight } = options.resize || {}
        const quality = options.quality || 0.8

        let { width, height } = img

        // Resize if specified
        if (targetWidth || targetHeight) {
          const ratio = Math.min(targetWidth ? targetWidth / width : 1, targetHeight ? targetHeight / height : 1)
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height

        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const optimizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
              resolve(optimizedFile)
            } else {
              resolve(file)
            }
          },
          file.type,
          quality,
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }
}

// Cloudinary Adapter
export class CloudinaryAdapter implements UploadAdapter {
  async upload(file: File, options: UploadOptions = {}): Promise<UploadResult> {
    this.validateFile(file, options)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", options.folder || "long-blog")

    const response = await fetch("/api/upload/cloudinary", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    return await response.json()
  }

  async delete(url: string): Promise<void> {
    await fetch("/api/upload/cloudinary", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
  }

  async list(options: ListOptions = {}): Promise<UploadedFile[]> {
    const response = await fetch("/api/upload/cloudinary/list")
    const data = await response.json()
    return data.files || []
  }

  private validateFile(file: File, options: UploadOptions) {
    const maxSize = options.maxSize || 10 * 1024 * 1024
    const allowedTypes = options.allowedTypes || ["image/jpeg", "image/png", "image/gif", "image/webp"]

    if (file.size > maxSize) {
      throw new Error(`File quá lớn. Tối đa ${Math.round(maxSize / 1024 / 1024)}MB`)
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Định dạng không được hỗ trợ`)
    }
  }
}

// Upload Manager - Factory pattern
export class UploadManager {
  private adapter: UploadAdapter

  constructor(provider: "vercel" | "cloudinary" = "vercel") {
    switch (provider) {
      case "cloudinary":
        this.adapter = new CloudinaryAdapter()
        break
      case "vercel":
      default:
        this.adapter = new VercelBlobAdapter()
        break
    }
  }

  async upload(file: File, options?: UploadOptions): Promise<UploadResult> {
    return this.adapter.upload(file, options)
  }

  async delete(url: string): Promise<void> {
    return this.adapter.delete(url)
  }

  async list(options?: ListOptions): Promise<UploadedFile[]> {
    return this.adapter.list(options)
  }
}
