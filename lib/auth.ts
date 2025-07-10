import bcrypt from "bcryptjs"

export interface User {
  id: string
  username: string
  email: string
  password: string
  role: "admin" | "editor" | "viewer"
  status: "active" | "inactive"
  avatar?: string
  created_at: string
  updated_at: string
  last_login?: string
}

export interface Permission {
  read: boolean
  write: boolean
  delete: boolean
  manage_users: boolean
  manage_settings: boolean
}

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@longblog.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // admin123
    role: "admin",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    last_login: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    username: "editor",
    email: "editor@longblog.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // editor123
    role: "editor",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
    last_login: "2024-01-14T15:20:00Z",
  },
  {
    id: "3",
    username: "xuanlam",
    email: "xuanlam@gmail.com",
    password: "xuanlam@98", // Plain text for this specific user
    role: "admin",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
    last_login: "2024-01-16T08:00:00Z",
  },
  {
    id: "4",
    username: "viewer",
    email: "viewer@longblog.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // viewer123
    role: "viewer",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
]

export const rolePermissions: Record<User["role"], Permission> = {
  admin: {
    read: true,
    write: true,
    delete: true,
    manage_users: true,
    manage_settings: true,
  },
  editor: {
    read: true,
    write: true,
    delete: true,
    manage_users: false,
    manage_settings: false,
  },
  viewer: {
    read: true,
    write: false,
    delete: false,
    manage_users: false,
    manage_settings: false,
  },
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = mockUsers.find((u) => u.email === email && u.status === "active")
  if (!user) return null

  let isValid = false

  // Special handling for xuanlam@gmail.com
  if (email === "xuanlam@gmail.com") {
    isValid = password === "xuanlam@98"
  } else {
    isValid = await verifyPassword(password, user.password)
  }

  if (!isValid) return null

  // Update last login
  user.last_login = new Date().toISOString()
  return user
}

export function getUserPermissions(role: User["role"]): Permission {
  return rolePermissions[role]
}

export function hasPermission(userRole: User["role"], permission: keyof Permission): boolean {
  return rolePermissions[userRole][permission]
}

export async function getAllUsers(): Promise<User[]> {
  return mockUsers.map((user) => ({ ...user, password: "" })) // Don't return passwords
}

export async function getUserById(id: string): Promise<User | null> {
  const user = mockUsers.find((u) => u.id === id)
  if (!user) return null
  return { ...user, password: "" } // Don't return password
}

export async function createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
  const hashedPassword = await hashPassword(userData.password)
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    password: hashedPassword,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockUsers.push(newUser)
  return { ...newUser, password: "" } // Don't return password
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  const userIndex = mockUsers.findIndex((u) => u.id === id)
  if (userIndex === -1) return null

  if (userData.password) {
    userData.password = await hashPassword(userData.password)
  }

  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...userData,
    updated_at: new Date().toISOString(),
  }

  return { ...mockUsers[userIndex], password: "" } // Don't return password
}

export async function deleteUser(id: string): Promise<boolean> {
  const userIndex = mockUsers.findIndex((u) => u.id === id)
  if (userIndex === -1) return false

  // Don't allow deleting the last admin
  const user = mockUsers[userIndex]
  if (user.role === "admin") {
    const adminCount = mockUsers.filter((u) => u.role === "admin").length
    if (adminCount <= 1) return false
  }

  mockUsers.splice(userIndex, 1)
  return true
}

export async function toggleUserStatus(id: string): Promise<User | null> {
  const userIndex = mockUsers.findIndex((u) => u.id === id)
  if (userIndex === -1) return null

  const user = mockUsers[userIndex]
  user.status = user.status === "active" ? "inactive" : "active"
  user.updated_at = new Date().toISOString()

  return { ...user, password: "" } // Don't return password
}
