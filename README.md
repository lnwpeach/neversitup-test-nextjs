```text
project/
├── node_modules/
├── pages/
│   ├── _app.tsx            # ไฟล์สำหรับเริ่มต้นแอปพลิเคชัน ที่ใช้ Material-UI ThemeProvider
│   ├── _document.tsx       # ไฟล์สำหรับกำหนด document ของ Next.js
│   └── index.tsx           # หน้าหลัก
├── public/
│   ├── images/
│   └── favicon.ico
├── components/             # โฟลเดอร์สำหรับเก็บ components ที่ใช้ร่วมกัน
├── lib/                    # โฟลเดอร์สำหรับเก็บไฟล์สไตล์ (ใช้ theme.ts สำหรับ Material-UI theme)
├── hooks/                  # โฟลเดอร์สำหรับ custom hooks (เพิ่มเติม)
│   ├── useAuth.tsx         # Hook สำหรับ authentication
│   └── useApi.tsx          # Hook สำหรับ fetch API ด้วย user token และ params ที่จำเป็นต่างๆแนบไปกับ Headers
├── .eslintrc.js
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```
