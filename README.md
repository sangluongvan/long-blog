# Blog của Long - Cat Blog Website

Một trang web blog cá nhân dành riêng cho chú mèo Long, được xây dựng với Next.js 15.

## ✨ Tính năng

### 🏠 Frontend
- **Trang chủ**: Hero section, thống kê, bài viết mới nhất
- **Blog**: Danh sách bài viết với filter và phân trang
- **Chi tiết bài viết**: Nội dung đầy đủ với comments
- **Gallery**: Thư viện ảnh/video của Long
- **About**: Thông tin chi tiết về Long
- **Responsive design**: Hoạt động tốt trên mọi thiết bị

### 🔧 Admin Panel
- **Dashboard**: Thống kê tổng quan
- **Quản lý bài viết**: Tạo, sửa, xóa bài viết
- **Rich text editor**: Editor WYSIWYG
- **Media manager**: Upload và quản lý ảnh/video
- **Settings**: Cài đặt website
- **Authentication**: Bảo mật admin area

### 🚀 Technical Features
- **Next.js 15**: App Router, Server Components
- **Mock Data**: Hoạt động mà không cần database
- **Tailwind CSS**: Styling với shadcn/ui
- **TypeScript**: Type safety
- **SEO optimized**: Meta tags, structured data

## 🛠️ Cài đặt và Chạy

### 1. Clone repository
\`\`\`bash
git clone <repository-url>
cd long-cat-blog
\`\`\`

### 2. Cài đặt dependencies
\`\`\`bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
\`\`\`

### 3. Chạy development server
\`\`\`bash
npm run dev
\`\`\`

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## 🚀 Deploy lên Vercel

### 1. Push code lên GitHub
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

### 2. Deploy trên Vercel
1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import repository từ GitHub
4. Deploy! (Không cần environment variables)

## 🔐 Admin Access

- URL: `/admin/auth`
- Demo credentials:
  - Email: `admin@longblog.com`
  - Password: `admin123`

## 📝 Sử dụng

### Tạo bài viết mới
1. Đăng nhập admin panel
2. Vào "Bài viết" → "Tạo bài viết mới"
3. Điền thông tin và nội dung
4. Upload ảnh đại diện
5. Chọn danh mục và tags
6. Lưu nháp hoặc đăng ngay

### Upload media
1. Vào "Thư viện" trong admin panel
2. Drag & drop files hoặc click "Chọn file"
3. Files sẽ được mock upload

### Cài đặt website
1. Vào "Cài đặt" trong admin panel
2. Tùy chỉnh thông tin website
3. Cấu hình SEO, theme, etc.

## 🎨 Customization

### Thay đổi màu sắc
Chỉnh sửa `tailwind.config.ts`:
\`\`\`js
colors: {
  primary: {
    500: '#f97316', // Orange
    600: '#ea580c',
  }
}
\`\`\`

### Thêm tính năng mới
1. Tạo component trong `components/`
2. Thêm API route trong `app/api/`
3. Cập nhật mock data nếu cần

## 🔄 Upgrade to Real Database

Để sử dụng database thật (Supabase):

1. **Tạo Supabase project**
   - Đăng ký tại [supabase.com](https://supabase.com)
   - Tạo project mới

2. **Chạy SQL scripts**
   - Copy nội dung từ `scripts/create-database.sql`
   - Paste vào Supabase SQL Editor
   - Chạy để tạo tables

3. **Cập nhật environment variables**
   \`\`\`bash
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   \`\`\`

4. **Update code**
   - Uncomment Supabase imports trong `lib/supabase.ts`
   - Update API routes để sử dụng Supabase

## 🐛 Troubleshooting

### Build errors
- Đảm bảo tất cả dependencies đã được cài đặt
- Chạy `npm run lint` để kiểm tra lỗi

### Mock data không hiển thị
- Kiểm tra console để xem lỗi
- Đảm bảo API routes hoạt động

## 📞 Support

Nếu gặp vấn đề, hãy tạo issue trên GitHub repository.

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.
