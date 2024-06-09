-----Các bước cài đặt và build chương trình-----

*Yêu cầu hệ thống phải có node version 16.

B1: Download Sourcecode từ Github về sẽ có 2 thư mục social-app-backend và social-app-frontend

B2: Cài đặt package. 
	- Vào thự mục social-app-backend chạy lệnh npm i
	- Vào thự mục social-app-frontend chạy lệnh yarn
	(Nếu chưa có yarn thì chạy câu lệnh npm i -g yarn)

B3: Tạo tài khoản MongoDB, lấy đường link từ MongoDB paste vào file .env trong thư mục backend ở dòng DB_CONNECTION

B3: Tạo tài khoản Cloundinary sau đó copy cloud_name, api_key, api_secret vào file .env trong thư mục backend

B4: Tạo tài khoản Mailtrap, cấu hình Mailtrap, lựa chọn Integrations là Nodemailer sau đó copy username và password và paste vào file .env

B5: Trong file .env dòng JWT.SECRET và JWT_REFRESH_TOKEN_SECRET điền tên tự do nhưng phải giống nhau. Ví dụ: nhathuybui. Dòng PORT là 8080 và MODE là dev

B6: Vào file .env trong thư mục frontend, điền vào URL http://localhost:8088

B7: Vào thư mục social-app-backend chạy lệnh npm run dev, thư mục social-app-frontend chạy lệnh npm run start để chạy chương trình.


