"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Settings,
  Globe,
  Mail,
  Shield,
  Palette,
  Database,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setSaving] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  // General Settings
  const [siteTitle, setSiteTitle] = useState("Blog của Long")
  const [siteDescription, setSiteDescription] = useState("Chia sẻ cuộc sống hàng ngày của chú mèo Long")
  const [siteUrl, setSiteUrl] = useState("https://longblog.com")
  const [adminEmail, setAdminEmail] = useState("admin@longblog.com")
  const [timezone, setTimezone] = useState("Asia/Ho_Chi_Minh")
  const [language, setLanguage] = useState("vi")

  // Content Settings
  const [postsPerPage, setPostsPerPage] = useState("6")
  const [enableComments, setEnableComments] = useState(true)
  const [moderateComments, setModerateComments] = useState(true)
  const [allowGuestComments, setAllowGuestComments] = useState(true)
  const [enableRss, setEnableRss] = useState(true)

  // SEO Settings
  const [seoTitle, setSeoTitle] = useState("Blog của Long - Cuộc sống của một chú mèo đáng yêu")
  const [seoDescription, setSeoDescription] = useState(
    "Theo dõi những câu chuyện thú vị và khoảnh khắc đáng yêu của Long",
  )
  const [seoKeywords, setSeoKeywords] = useState("mèo, pet blog, Long, câu chuyện mèo")
  const [googleAnalytics, setGoogleAnalytics] = useState("")
  const [facebookPixel, setFacebookPixel] = useState("")

  // Security Settings
  const [enableTwoFactor, setEnableTwoFactor] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("24")
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5")
  const [enableCaptcha, setEnableCaptcha] = useState(false)
  const [apiKey, setApiKey] = useState("sk-1234567890abcdef")

  // Email Settings
  const [smtpHost, setSmtpHost] = useState("")
  const [smtpPort, setSmtpPort] = useState("587")
  const [smtpUsername, setSmtpUsername] = useState("")
  const [smtpPassword, setSmtpPassword] = useState("")
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(true)

  // Theme Settings
  const [primaryColor, setPrimaryColor] = useState("#f97316")
  const [secondaryColor, setSecondaryColor] = useState("#ec4899")
  const [enableDarkMode, setEnableDarkMode] = useState(false)
  const [customCss, setCustomCss] = useState("")

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSaving(false)
    alert("Cài đặt đã được lưu thành công!")
  }

  const generateNewApiKey = () => {
    const newKey = "sk-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setApiKey(newKey)
  }

  const exportSettings = () => {
    const settings = {
      general: { siteTitle, siteDescription, siteUrl, adminEmail, timezone, language },
      content: { postsPerPage, enableComments, moderateComments, allowGuestComments, enableRss },
      seo: { seoTitle, seoDescription, seoKeywords, googleAnalytics, facebookPixel },
      security: { enableTwoFactor, sessionTimeout, maxLoginAttempts, enableCaptcha },
      email: { smtpHost, smtpPort, smtpUsername, enableEmailNotifications },
      theme: { primaryColor, secondaryColor, enableDarkMode, customCss },
    }

    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "blog-settings.json"
    a.click()
  }

  const importSettings = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const settings = JSON.parse(e.target?.result as string)
            // Apply imported settings
            if (settings.general) {
              setSiteTitle(settings.general.siteTitle || siteTitle)
              setSiteDescription(settings.general.siteDescription || siteDescription)
              // ... apply other settings
            }
            alert("Cài đặt đã được import thành công!")
          } catch (error) {
            alert("File không hợp lệ!")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const tabs = [
    { id: "general", label: "Tổng quan", icon: Globe },
    { id: "content", label: "Nội dung", icon: Settings },
    { id: "seo", label: "SEO", icon: Globe },
    { id: "security", label: "Bảo mật", icon: Shield },
    { id: "email", label: "Email", icon: Mail },
    { id: "theme", label: "Giao diện", icon: Palette },
    { id: "backup", label: "Sao lưu", icon: Database },
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center text-blue-900">
            <Globe className="mr-2 h-5 w-5" />
            Thông tin website
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="site-title">Tên website</Label>
              <Input
                id="site-title"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label htmlFor="site-url">URL website</Label>
              <Input
                id="site-url"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="site-description">Mô tả website</Label>
            <Textarea
              id="site-description"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              rows={3}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="admin-email">Email quản trị</Label>
              <Input
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label htmlFor="timezone">Múi giờ</Label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-blue-200"
              >
                <option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</option>
                <option value="Asia/Bangkok">Bangkok (UTC+7)</option>
                <option value="Asia/Singapore">Singapore (UTC+8)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="language">Ngôn ngữ</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-blue-200"
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContentSettings = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="flex items-center text-green-900">
            <Settings className="mr-2 h-5 w-5" />
            Cài đặt nội dung
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="posts-per-page">Số bài viết mỗi trang</Label>
            <Input
              id="posts-per-page"
              type="number"
              value={postsPerPage}
              onChange={(e) => setPostsPerPage(e.target.value)}
              className="max-w-xs border-gray-200 focus:border-green-300 focus:ring-green-200"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Bình luận</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-comments">Cho phép bình luận</Label>
                  <p className="text-sm text-gray-500">Độc giả có thể để lại bình luận</p>
                </div>
                <Switch id="enable-comments" checked={enableComments} onCheckedChange={setEnableComments} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="moderate-comments">Duyệt bình luận</Label>
                  <p className="text-sm text-gray-500">Bình luận cần được duyệt trước khi hiển thị</p>
                </div>
                <Switch id="moderate-comments" checked={moderateComments} onCheckedChange={setModerateComments} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="guest-comments">Bình luận khách</Label>
                  <p className="text-sm text-gray-500">Cho phép khách bình luận mà không cần đăng ký</p>
                </div>
                <Switch id="guest-comments" checked={allowGuestComments} onCheckedChange={setAllowGuestComments} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-rss">RSS Feed</Label>
              <p className="text-sm text-gray-500">Cho phép độc giả đăng ký RSS</p>
            </div>
            <Switch id="enable-rss" checked={enableRss} onCheckedChange={setEnableRss} />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSeoSettings = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="flex items-center text-purple-900">
            <Globe className="mr-2 h-5 w-5" />
            Tối ưu SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="seo-title">SEO Title</Label>
            <Input
              id="seo-title"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
            />
            <p className="text-xs text-gray-500 mt-1">{seoTitle.length}/60 ký tự</p>
          </div>
          <div>
            <Label htmlFor="seo-description">Meta Description</Label>
            <Textarea
              id="seo-description"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">{seoDescription.length}/160 ký tự</p>
          </div>
          <div>
            <Label htmlFor="seo-keywords">Keywords</Label>
            <Input
              id="seo-keywords"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
              placeholder="Từ khóa cách nhau bằng dấu phẩy"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="google-analytics">Google Analytics ID</Label>
              <Input
                id="google-analytics"
                value={googleAnalytics}
                onChange={(e) => setGoogleAnalytics(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
              />
            </div>
            <div>
              <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
              <Input
                id="facebook-pixel"
                value={facebookPixel}
                onChange={(e) => setFacebookPixel(e.target.value)}
                placeholder="123456789012345"
                className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg">
          <CardTitle className="flex items-center text-red-900">
            <Shield className="mr-2 h-5 w-5" />
            Bảo mật
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Xác thực 2 bước</Label>
              <p className="text-sm text-gray-500">Tăng cường bảo mật tài khoản admin</p>
            </div>
            <Switch id="two-factor" checked={enableTwoFactor} onCheckedChange={setEnableTwoFactor} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="session-timeout">Thời gian phiên (giờ)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="border-gray-200 focus:border-red-300 focus:ring-red-200"
              />
            </div>
            <div>
              <Label htmlFor="max-login">Số lần đăng nhập tối đa</Label>
              <Input
                id="max-login"
                type="number"
                value={maxLoginAttempts}
                onChange={(e) => setMaxLoginAttempts(e.target.value)}
                className="border-gray-200 focus:border-red-300 focus:ring-red-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="captcha">CAPTCHA</Label>
              <p className="text-sm text-gray-500">Bảo vệ khỏi bot và spam</p>
            </div>
            <Switch id="captcha" checked={enableCaptcha} onCheckedChange={setEnableCaptcha} />
          </div>

          <div>
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  readOnly
                  className="border-gray-200 focus:border-red-300 focus:ring-red-200"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button variant="outline" onClick={generateNewApiKey} className="bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tạo mới
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
          <CardTitle className="flex items-center text-blue-900">
            <Mail className="mr-2 h-5 w-5" />
            Cài đặt Email
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                placeholder="smtp.gmail.com"
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-username">Username</Label>
              <Input
                id="smtp-username"
                value={smtpUsername}
                onChange={(e) => setSmtpUsername(e.target.value)}
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label htmlFor="smtp-password">Password</Label>
              <Input
                id="smtp-password"
                type="password"
                value={smtpPassword}
                onChange={(e) => setSmtpPassword(e.target.value)}
                className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Thông báo email</Label>
              <p className="text-sm text-gray-500">Gửi email khi có bình luận mới</p>
            </div>
            <Switch
              id="email-notifications"
              checked={enableEmailNotifications}
              onCheckedChange={setEnableEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderThemeSettings = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg">
          <CardTitle className="flex items-center text-pink-900">
            <Palette className="mr-2 h-5 w-5" />
            Giao diện
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-color">Màu chính</Label>
              <div className="flex space-x-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 border-gray-200"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondary-color">Màu phụ</Label>
              <div className="flex space-x-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-10 border-gray-200"
                />
                <Input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode">Chế độ tối</Label>
              <p className="text-sm text-gray-500">Cho phép chuyển đổi giao diện tối</p>
            </div>
            <Switch id="dark-mode" checked={enableDarkMode} onCheckedChange={setEnableDarkMode} />
          </div>

          <div>
            <Label htmlFor="custom-css">CSS tùy chỉnh</Label>
            <Textarea
              id="custom-css"
              value={customCss}
              onChange={(e) => setCustomCss(e.target.value)}
              placeholder="/* Thêm CSS tùy chỉnh ở đây */"
              className="h-32 font-mono text-sm border-gray-200 focus:border-pink-300 focus:ring-pink-200"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Preview màu sắc</h4>
            <div className="flex space-x-4">
              <div className="w-16 h-16 rounded-lg shadow-sm border" style={{ backgroundColor: primaryColor }}></div>
              <div className="w-16 h-16 rounded-lg shadow-sm border" style={{ backgroundColor: secondaryColor }}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  Màu chính và màu phụ sẽ được áp dụng cho buttons, links và các elements khác
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
          <CardTitle className="flex items-center text-green-900">
            <Database className="mr-2 h-5 w-5" />
            Sao lưu & Khôi phục
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Xuất dữ liệu</h4>
              <div className="space-y-3">
                <Button variant="outline" onClick={exportSettings} className="w-full justify-start bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Xuất cài đặt
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => alert("Chức năng xuất bài viết đang phát triển")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Xuất bài viết
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => alert("Chức năng xuất media đang phát triển")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Xuất media
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Nhập dữ liệu</h4>
              <div className="space-y-3">
                <Button variant="outline" onClick={importSettings} className="w-full justify-start bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Nhập cài đặt
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => alert("Chức năng nhập bài viết đang phát triển")}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Nhập bài viết
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => alert("Chức năng nhập media đang phát triển")}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Nhập media
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Xóa dữ liệu</h4>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-red-900">Khu vực nguy hiểm</h5>
                  <p className="text-sm text-red-700 mt-1">
                    Các thao tác này không thể hoàn tác. Hãy chắc chắn bạn đã sao lưu dữ liệu.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 bg-transparent"
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn xóa tất cả bình luận? Thao tác này không thể hoàn tác!")) {
                          alert("Chức năng xóa bình luận đang phát triển")
                        }
                      }}
                    >
                      Xóa tất cả bình luận
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 bg-transparent ml-2"
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn reset tất cả cài đặt? Thao tác này không thể hoàn tác!")) {
                          alert("Chức năng reset cài đặt đang phát triển")
                        }
                      }}
                    >
                      Reset cài đặt
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings()
      case "content":
        return renderContentSettings()
      case "seo":
        return renderSeoSettings()
      case "security":
        return renderSecuritySettings()
      case "email":
        return renderEmailSettings()
      case "theme":
        return renderThemeSettings()
      case "backup":
        return renderBackupSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
                  <p className="text-sm text-gray-500">Cấu hình và tùy chỉnh blog của Long</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu cài đặt
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-md shadow-lg min-h-screen border-r">
          <nav className="p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <tab.icon className="mr-3 h-5 w-5" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
