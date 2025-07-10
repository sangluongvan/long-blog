-- Thêm dữ liệu mẫu cho posts
-- Mock seed data for documentation
-- In production, this would insert actual data

INSERT INTO posts (title, content, excerpt, featured_image, category, tags, status, views, likes) VALUES
(
  'Ngày đầu tiên Long về nhà',
  '<p>Hôm nay là một ngày đặc biệt - ngày đầu tiên Long về với gia đình chúng tôi...</p>',
  'Câu chuyện về ngày đầu tiên chú mèo nhỏ bé đến với gia đình chúng tôi...',
  '/placeholder.svg?height=400&width=800',
  'Kỷ niệm',
  '["Long", "Kỷ niệm", "Ngày đầu", "Gia đình"]',
  'published',
  234,
  45
),
(
  'Những trò nghịch ngợm của Long',
  '<p>Long là một chú mèo rất nghịch ngợm! Mỗi ngày, chú đều có những trò tinh nghịch...</p>',
  'Hôm nay Long lại làm một trò nghịch ngợm khiến cả nhà cười không ngừng...',
  '/placeholder.svg?height=400&width=800',
  'Hài hước',
  '["Long", "Nghịch ngợm", "Hài hước", "Đời thường"]',
  'published',
  189,
  67
),
(
  'Long và món đồ chơi yêu thích',
  '<p>Sau nhiều lần thử nghiệm, chúng tôi đã tìm ra những món đồ chơi mà Long yêu thích nhất!</p>',
  'Khám phá những món đồ chơi mà Long yêu thích nhất và cách chúng tôi chọn...',
  '/placeholder.svg?height=400&width=800',
  'Đồ chơi',
  '["Long", "Đồ chơi", "Sở thích", "Mua sắm"]',
  'published',
  156,
  32
);

-- Thêm dữ liệu mẫu cho comments
INSERT INTO comments (post_id, author_name, author_email, content, status) VALUES
(
  (SELECT id FROM posts WHERE title = 'Ngày đầu tiên Long về nhà' LIMIT 1),
  'Nguyễn Văn A',
  'nguyenvana@email.com',
  'Long thật đáng yêu! Tôi cũng có một chú mèo giống vậy.',
  'approved'
),
(
  (SELECT id FROM posts WHERE title = 'Ngày đầu tiên Long về nhà' LIMIT 1),
  'Trần Thị B',
  'tranthib@email.com',
  'Cảm ơn bạn đã chia sẻ những câu chuyện thú vị!',
  'approved'
);

-- Thêm settings mặc định
INSERT INTO settings (key, value) VALUES
('site_title', 'Blog của Long'),
('site_description', 'Chia sẻ cuộc sống hàng ngày của chú mèo Long'),
('admin_email', 'admin@longblog.com'),
('posts_per_page', '6'),
('enable_comments', 'true');
