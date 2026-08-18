# Dokumentasi Tugas 10: Fitur Riwayat Percakapan (CS Bot API)

Dokumentasi ini disusun untuk memenuhi tugas penambahan fitur **Penyimpanan Riwayat Percakapan (Message History)** pada aplikasi CS Bot API berbasis Express.js, Sequelize, dan Gemini Generative AI.

---

## 📌 Ringkasan Implementasi Fitur

1. **Persetujuan Pengguna (Consent Pop-up):**
   * Sebelum pengguna mulai melakukan chat pada antarmuka Web UI, muncul Pop-up Modal yang meminta persetujuan apakah percakapan boleh direkam ke database.
   * Pilihan pengguna menentukan parameter `save_history: true` atau `save_history: false` saat melakukan request ke API.

2. **Model Database (`ChatHistory`):**
   * Lokasi: `models/chatHistory.model.js`
   * Menyimpan `id`, `message` (pesan user), `response` (balasan bot), dan timestamp `createdAt`.

3. **Endpoint Create (`POST /api/chat`):**
   * Memproses pertanyaan pengguna via Gemini AI.
   * Hanya menyimpan pesan ke tabel `chat_histories` jika `save_history: true`.

4. **Endpoint Read (`GET /api/chat/history`):**
   * Mengambil dan mengembalikan seluruh riwayat percakapan yang tersimpan di database.

5. **Antarmuka Web (UI):**
   * Disediakan pada `public/index.html` dengan desain modern responsif, modal persetujuan interaktif, serta tabel riwayat chat real-time.

---

## 🔗 Dokumentasi API (Endpoints)

### 1. Kirim Pesan / Chat dengan Bot (`POST /api/chat`)
* **URL:** `/api/chat`
* **Method:** `POST`
* **Content-Type:** `application/json`

#### Request Body (User Setuju Simpan Riwayat):
```json
{
  "message": "kaos polos ada warna apa aja dan harganya berapa?",
  "save_history": true
}
```

#### Request Body (User Tidak Setuju Simpan Riwayat):
```json
{
  "message": "kaos polos ada warna apa aja dan harganya berapa?",
  "save_history": false
}
```

#### Response Sukses (200 OK):
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

### 2. Ambil Riwayat Percakapan (`GET /api/chat/history`)
* **URL:** `/api/chat/history`
* **Method:** `GET`

#### Response Sukses (200 OK):
```json
{
  "code": 200,
  "success": true,
  "message": "Berhasil mengambil riwayat percakapan",
  "data": [
    {
      "id": 1,
      "message": "kaos polos ada warna apa aja dan harganya berapa?",
      "response": "Kaos polos tersedia dalam warna Hitam dan Putih dengan harga Rp 75.000.",
      "createdAt": "2026-08-18T22:30:00.000Z",
      "updatedAt": "2026-08-18T22:30:00.000Z"
    }
  ]
}
```

---

## 🚀 Cara Menjalankan Project

1. **Persiapkan File Environment (`.env`):**
   Copy file `.env.example` menjadi `.env` dan isi kredensial PostgreSQL serta `GEMINI_API_KEY`:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=cs_bot_db
   DB_USER=postgres
   DB_PASS=your_postgres_password
   GEMINI_API_KEY=your_gemini_api_key
   ```

2. **Install Package Dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan Seeding Data Awal:**
   ```bash
   npm run seed
   ```

4. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Akses Web UI di: `http://localhost:3000`

---

## 📸 Lampiran Screenshot (SS) Endpoint

*(Lampirkan hasil screenshot pengujian endpoint Postman / Browser Web UI di bawah ini)*

1. **Screenshot Pop-up Persetujuan (Consent Pop-up):**
   * *[Tempat Gambar SS Pop-Up Persetujuan]*

2. **Screenshot Endpoint POST /api/chat (Create & Response Bot):**
   * *[Tempat Gambar SS Request POST /api/chat]*

3. **Screenshot Endpoint GET /api/chat/history (Tabel Riwayat Chat):**
   * *[Tempat Gambar SS Request GET /api/chat/history]*
