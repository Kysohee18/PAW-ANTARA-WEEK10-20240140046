# CS Bot API — Generative AI + Prompt Engineering + Express/Sequelize

Customer Service AI otomatis berbasis Gemini Generative AI yang terintegrasi dengan Express.js, Sequelize ORM (PostgreSQL), dan sistem penyimpanan riwayat percakapan interaktif (*Message History*) dengan persetujuan pengguna (*User Consent Protocol*).

---

## 🚀 Fitur Utama

1. **Integrasi LLM di Server** — Menggunakan Google Gemini API dengan API key aman di `.env`.
2. **Prompt Engineering & Grounding Data** — Bot hanya menjawab seputar data produk yang tersedia di database.
3. **Defense in Depth** — Validasi berlapis di level middleware kode serta di level system instruction Gemini.
4. **Penyimpanan Riwayat Percakapan (Message History)** — Percakapan disimpan ke database `chat_histories` hanya jika pengguna memberikan persetujuan (*consent*).
5. **Modern Web Intelligence Console** — Antarmuka Web UI modern dengan arsitektur *Double-Bezel*, *Spring Physics Motion*, *Live History Telemetry*, dan *Consent Gateway Modal*.

---

## 📁 Struktur Folder

```
cs-bot-api/
├── app.js
├── config/
│   ├── database.js                    # Koneksi Sequelize PostgreSQL
│   └── gemini.js                      # Setup client Gemini API
├── models/
│   ├── admin.model.js                 # Skema Admin
│   ├── product.model.js               # Skema Produk
│   ├── chatHistory.model.js           # Skema Riwayat Chat
│   └── index.js
├── controllers/
│   ├── admin.controller.js            # Login/Logout Admin
│   ├── product.controller.js          # CRUD Produk
│   └── chat.controller.js             # Chat AI & Read Riwayat
├── services/
│   └── gemini.service.js              # System prompt + Grounding + Guardrail
├── middlewares/
│   ├── auth.middleware.js             # Verifikasi session Admin
│   └── validateChatInput.middleware.js # Validasi pesan chat
├── routes/
│   ├── admin.routes.js
│   ├── product.routes.js
│   └── chat.routes.js
├── public/
│   └── index.html                     # Web Console UI & Consent Modal
├── seeders/
│   └── seed.js                        # Data awal Admin + Produk dummy
└── utils/
    └── response.js
```

---

## 🛠️ Cara Install & Menjalankan

1. **Persiapan Database PostgreSQL:**
   ```sql
   CREATE DATABASE cs_bot_db;
   ```

2. **Dapatkan Gemini API Key:**
   Dapatkan API key gratis di [Google AI Studio](https://aistudio.google.com/app/apikey).

3. **Konfigurasi File `.env`:**
   Salin file `.env.example` menjadi `.env` dan lengkapi datanya:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=cs_bot_db
   DB_USER=postgres
   DB_PASS=password_postgres_anda
   SESSION_SECRET=your-random-secret
   GEMINI_API_KEY=your_gemini_api_key_here
   STORE_NAME=Toko Kita
   ```

4. **Install Dependencies:**
   ```bash
   npm install
   ```

5. **Jalankan Seeding Data Awal:**
   ```bash
   npm run seed
   ```

6. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Akses Web Console di: `http://localhost:3000`

---

## 🔗 Daftar Endpoint API

### 1. Chat (CS Bot) & Riwayat
| Method | Endpoint            | Auth   | Body                                      | Keterangan                                  |
|--------|---------------------|--------|-------------------------------------------|----------------------------------------------|
| `POST` | `/api/chat`         | Publik | `{ "message": string, "save_history": boolean }` | Kirim pertanyaan ke bot AI & simpan jika disetujui |
| `GET`  | `/api/chat/history` | Publik | -                                         | Ambil seluruh riwayat percakapan dari DB     |
| `GET`  | `/api/chat`         | Publik | -                                         | Alias untuk ambil riwayat percakapan         |

#### Contoh Request POST `/api/chat` (Simpan Riwayat: True)
```json
{
  "message": "kaos polos ada warna apa aja dan harganya berapa?",
  "save_history": true
}
```

#### Contoh Request POST `/api/chat` (Simpan Riwayat: False)
```json
{
  "message": "kaos polos ada warna apa aja dan harganya berapa?",
  "save_history": false
}
```

#### Contoh Response Sukses (200 OK):
```json
{
  "code": 200,
  "success": true,
  "message": "Berhasil dapat balasan",
  "data": {
    "reply": "Kaos polos tersedia dalam warna Hitam dan Putih dengan harga Rp 75.000."
  }
}
```

---

### 2. Product
| Method | Endpoint             | Auth   | Body                                       | Keterangan        |
|--------|----------------------|--------|--------------------------------------------|-------------------|
| `GET`  | `/api/products`      | Publik | -                                          | List semua produk |
| `POST` | `/api/products`      | Admin  | `{ "name", "description", "price", "stock" }` | Tambah produk     |
| `PUT`  | `/api/products/:id`  | Admin  | `{ "name?", "description?", "price?", "stock?" }` | Update produk |
| `DELETE`| `/api/products/:id` | Admin  | -                                          | Hapus produk      |

---

### 3. Admin
| Method | Endpoint            | Body                      | Keterangan           |
|--------|---------------------|---------------------------|----------------------|
| `POST` | `/api/admin/login`  | `{ username, password }`  | Login admin (session)|
| `POST` | `/api/admin/logout` | -                         | Logout admin         |

---

## 📸 Screenshot Antarmuka & Pengujian

Dokumentasi tangkapan layar (*screenshot*) antarmuka Web CS Bot Fashion Assistant dan fitur riwayat percakapan:

<img width="1919" height="1022" alt="image" src="https://github.com/user-attachments/assets/6c074b41-3021-485c-9490-cd93cbafc599" />


---

## 🛡️ Prinsip Keamanan & Guardrail

- **Grounding Dinamis:** Bot mengambil informasi produk terkini langsung dari database sebelum menyusun `systemInstruction` Gemini.
- **Anti-Prompt Injection:** Instruksi sistem dikirimkan pada field khusus `systemInstruction` SDK Gemini agar tidak tertimpa oleh pesan pengguna.
- **Defense in Depth:** Middleware `validateChatInput` membatasi panjang pesan dan memvalidasi tipe data sebelum request mencapai model LLM.
- **API Key Terproteksi:** `GEMINI_API_KEY` disimpan secara eksklusif di sisi server (`.env`) dan tidak pernah diekspos ke antarmuka client.
