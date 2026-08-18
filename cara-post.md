# Panduan Running Program & Testing API (Postman)

Dokumen ini berisi panduan lengkap **cara menjalankan aplikasi (run program)** dari awal hingga cara **melakukan pengujian API menggunakan Postman**.

---

## 🚀 Part 1: Cara Menjalankan Program (How to Run)

### 1. Prasyarat System
* **Node.js**: v18.x atau lebih baru
* **PostgreSQL Database Server**: Aktif di localhost (port 5432)
* **Gemini API Key**: Diperoleh secara gratis dari [Google AI Studio](https://aistudio.google.com/app/apikey)

---

### 2. Langkah-Langkah Running Aplikasi

#### **Langkah 1: Persiapan Database PostgreSQL**
Buka terminal / pgAdmin / psql, lalu buat database bernama `cs_bot_db`:
```sql
CREATE DATABASE cs_bot_db;
```

#### **Langkah 2: Konfigurasi File Environment (`.env`)**
Buat/edit file `.env` di dalam root direktori proyek (`PAW-ANTARA-WEEK10/.env`), lalu sesuaikan konfigurasinya:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=cs_bot_db
DB_USER=postgres
DB_PASS=password_postgres_kamu

SESSION_SECRET=secret-key-bebas-diisi-apa-saja

GEMINI_API_KEY=API_KEY_GEMINI_KAMU_DISINI
STORE_NAME=Toko Kita
```

#### **Langkah 3: Install Package Dependencies**
Jalankan perintah berikut pada terminal di folder proyek:
```bash
npm install
```

#### **Langkah 4: Jalankan Database Seeding (Data Awal)**
Perintah ini akan membuat tabel-tabel di database (Admin, Product, ChatHistory) serta mengisinya dengan data awal dummy:
```bash
npm run seed
```

#### **Langkah 5: Jalankan Server Development**
```bash
npm run dev
```
Jika berhasil, terminal akan menampilkan output:
```text
Koneksi database berhasil
Sync model selesai
Server jalan di http://localhost:3000
```

#### **Langkah 6: Akses Web UI**
Buka browser dan kunjungi:
👉 **`http://localhost:3000`**

---

## 📮 Part 2: Cara Testing API Menggunakan Postman

Buka aplikasi **Postman**, lalu ikuti instruksi pengujian endpoint di bawah ini:

---

### 1. Test Endpoint Chat (Dengan Persetujuan Simpan Riwayat)
* **Method:** `POST`
* **URL:** `http://localhost:3000/api/chat`
* **Headers:**
  * `Content-Type`: `application/json`
* **Body (raw -> JSON):**
  ```json
  {
    "message": "kaos polos harganya berapa dan warna apa aja?",
    "save_history": true
  }
  ```
* **Expected Response (200 OK):**
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
> 💡 **Keterangan:** Karena `save_history: true`, percakapan di atas **akan tersimpan** ke database.

---

### 2. Test Endpoint Chat (Tanpa Simpan Riwayat)
* **Method:** `POST`
* **URL:** `http://localhost:3000/api/chat`
* **Headers:**
  * `Content-Type`: `application/json`
* **Body (raw -> JSON):**
  ```json
  {
    "message": "ada jaket hoodie gak?",
    "save_history": false
  }
  ```
* **Expected Response (200 OK):**
  ```json
  {
    "code": 200,
    "success": true,
    "message": "Berhasil dapat balasan",
    "data": {
      "reply": "Jaket Hoodie katun fleece harganya Rp 150.000."
    }
  }
  ```
> 💡 **Keterangan:** Karena `save_history: false`, percakapan ini **tidak disimpan** ke database.

---

### 3. Test Endpoint Ambil Riwayat Percakapan (Read History)
* **Method:** `GET`
* **URL:** `http://localhost:3000/api/chat/history` (atau `http://localhost:3000/api/chat`)
* **Headers:** Tidak ada header khusus.
* **Body:** None (kosong).
* **Expected Response (200 OK):**
  ```json
  {
    "code": 200,
    "success": true,
    "message": "Berhasil mengambil riwayat percakapan",
    "data": [
      {
        "id": 1,
        "message": "kaos polos harganya berapa dan warna apa aja?",
        "response": "Kaos polos tersedia dalam warna Hitam dan Putih dengan harga Rp 75.000.",
        "createdAt": "2026-08-18T22:30:00.000Z",
        "updatedAt": "2026-08-18T22:30:00.000Z"
      }
    ]
  }
  ```

---

### 4. Test Endpoint Guardrail (Pertanyaan di Luar Konteks Produk)
* **Method:** `POST`
* **URL:** `http://localhost:3000/api/chat`
* **Body (raw -> JSON):**
  ```json
  {
    "message": "buatkan kode HTML landing page dong",
    "save_history": false
  }
  ```
* **Expected Response (200 OK):**
  Bot akan menolak menjawab dan mengarahkan kembali ke topik produk toko, sesuai aturan *guardrail* Gemini service.

---

### 5. Test Endpoint Login Admin (Opsional)
* **Method:** `POST`
* **URL:** `http://localhost:3000/api/admin/login`
* **Body (raw -> JSON):**
  ```json
  {
    "username": "admin",
    "password": "adminpassword"
  }
  ```
* **Expected Response (200 OK):**
  ```json
  {
    "code": 200,
    "success": true,
    "message": "Login berhasil",
    "data": {
      "id": 1,
      "username": "admin"
    }
  }
  ```
