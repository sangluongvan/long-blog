import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  name: string
  password: string
  role: "admin" | "editor" | "viewer"
  avatar?: string
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserData {
  email: string
  name: string
  password: string
  role: "admin" | "editor" | "viewer"
}

export interface UpdateUserData {
  email?: string
  name?: string
  password?: string
  role?: "admin" | "editor" | "viewer"
  avatar?: string
  isActive?: boolean
}

// Mock users database - trong production sẽ dùng database thật
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@longblog.com",
    name: "Admin",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: admin123
    role: "admin",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "editor@longblog.com",
    name: "Editor",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: editor123
    role: "editor",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
]

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static async authenticate(email: string, password: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.email === email && u.isActive)

    if (!user) {
      return null
    }

    const isValidPassword = await this.comparePassword(password, user.password)

    if (!isValidPassword) {
      return null
    }

    // Update last login
    user.lastLogin = new Date()

    return user
  }

  static async getAllUsers(): Promise<User[]> {
    return mockUsers.map((user) => ({
      ...user,
      password: "", // Don't return password
    }))
  }

  static async getUserById(id: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      return {
        ...user,
        password: "", // Don't return password
      }
    }
    return null
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.email === email)
    if (user) {
      return {
        ...user,
        password: "", // Don't return password
      }
    }
    return null
  }

  static async createUser(userData: CreateUserData): Promise<User> {
    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      throw new Error("Email đã được sử dụng")
    }

    const hashedPassword = await this.hashPassword(userData.password)

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      role: userData.role,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockUsers.push(newUser)

    return {
      ...newUser,
      password: "", // Don't return password
    }
  }

  static async updateUser(id: string, userData: UpdateUserData): Promise<User | null> {
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return null
    }

    const user = mockUsers[userIndex]

    // Check if email is being changed and already exists
    if (userData.email && userData.email !== user.email) {
      const existingUser = mockUsers.find((u) => u.email === userData.email && u.id !== id)
      if (existingUser) {
        throw new Error("Email đã được sử dụng")
      }
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = await this.hashPassword(userData.password)
    }

    const updatedUser = {
      ...user,
      ...userData,
      updatedAt: new Date(),
    }

    mockUsers[userIndex] = updatedUser

    return {
      ...updatedUser,
      password: "", // Don't return password
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return false
    }

    // Don't allow deleting the last admin
    const user = mockUsers[userIndex]
    if (user.role === "admin") {
      const adminCount = mockUsers.filter((u) => u.role === "admin" && u.isActive).length
      if (adminCount <= 1) {
        throw new Error("Không thể xóa admin cuối cùng")
      }
    }

    mockUsers.splice(userIndex, 1)
    return true
  }

  static async toggleUserStatus(id: string): Promise<User | null> {
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return null
    }

    const user = mockUsers[userIndex]

    // Don't allow deactivating the last admin
    if (user.role === "admin" && user.isActive) {
      const activeAdminCount = mockUsers.filter((u) => u.role === "admin" && u.isActive).length
      if (activeAdminCount <= 1) {
        throw new Error("Không thể vô hiệu hóa admin cuối cùng")
      }
    }

    user.isActive = !user.isActive
    user.updatedAt = new Date()

    return {
      ...user,
      password: "", // Don't return password
    }
  }
}

export const ROLE_PERMISSIONS = {
  admin: {
    label: "Quản trị viên",
    description: "Toàn quyền quản lý hệ thống",
    permissions: ["read", "write", "delete", "manage_users", "manage_settings"],
    color: "bg-red-100 text-red-700",
  },
  editor: {
    label: "Biên tập viên",
    description: "Quản lý nội dung và media",
    permissions: ["read", "write", "delete"],
    color: "bg-blue-100 text-blue-700",
  },
  viewer: {
    label: "Người xem",
    description: "Chỉ xem nội dung",
    permissions: ["read"],
    color: "bg-gray-100 text-gray-700",
  },
}

export function hasPermission(userRole: string, permission: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS]
  return rolePermissions?.permissions.includes(permission) || false
}
