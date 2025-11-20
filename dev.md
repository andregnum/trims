# Development Guidelines

Dokumen ini berisi aturan dan standar yang digunakan dalam pengembangan project.

---

## 1. Branch Naming Convention

Gunakan format berikut untuk nama branch:

```text
<prefix>/<module>-<short-description>
```

### Prefix

- `feature/` : fitur baru  
- `fix/`     : perbaikan bug  
- `hotfix/`  : perbaikan darurat  
- `chore/`   : pekerjaan rutin (update deps, build config)  
- `docs/`    : dokumentasi  
- `test/`    : testing  

### Contoh Branch Prefix

```text
feature/auth-jwt-refresh
fix/billing-tax-calculation
chore/logger-formatting
docs/add-api-readme
```

---

## 2. Commit Message Convention

Project ini menggunakan **Commitizen** dengan format **Conventional Commits**.

### Format

```text
<type>(<scope>): <short description>
```

### Type

- `feat`     : fitur baru  
- `fix`      : perbaikan bug  
- `docs`     : perubahan dokumentasi  
- `style`    : perubahan format/kode (tanpa logika)  
- `refactor` : refactor kode tanpa fitur baru/bugfix  
- `test`     : menambah/memperbaiki test  
- `chore`    : pekerjaan rutin (update deps, build config)  

### Scope

Gunakan nama module/domain (misalnya `auth`, `customer`, `finance`, `billing`).  

### Contoh

```text
feat(auth): add jwt refresh token
fix(finance): correct tax calculation rounding
chore(logger): update pino config
docs(api): add readme for customer module
```

---

## 3. Changelog

Project ini menggunakan **standard-version** untuk generate changelog otomatis.

### Langkah

```bash
npx standard-version
```

Akan otomatis:

- Update versi di `package.json`  
- Generate/append `CHANGELOG.md`  
- Buat commit + tag versi baru  

---

## 4. Code Style

- Gunakan **TypeScript strict mode**.  
- Ikuti aturan linting (**ESLint + Prettier**).  
- Satu commit = satu perubahan logis.  
- Hindari commit besar yang mencampur banyak hal.  

---

## 5. Testing

- Unit test wajib untuk setiap module.  
- Gunakan **Jest** untuk testing.  
- Tambahkan **E2E test** untuk flow utama (login, akses API, multi-tenant check).  

---

## 6. Documentation

- `README.md` → deskripsi project, cara setup, cara run.  
- `dev.md` → aturan development (file ini).  
- Tambahkan komentar di code untuk bagian yang kompleks.  

---

## 7. Workflow

1. Buat branch baru dari `main`.  
2. Lakukan perubahan sesuai standar.  
3. Commit dengan Commitizen.  
4. Push branch.  
5. Buat Pull Request → review → merge ke `main`.  

---

## 8. Database Guideline

### 8.1 General Rules

- Gunakan **PostgreSQL** sebagai database utama.  
- ORM: **Prisma** dengan strict schema.  
- Semua tabel wajib memiliki:  
  - `id` (UUID, primary key)  
  - `tenant_id` (untuk multi-tenant)  
  - `created_at`, `updated_at` (timestamp)  
- Hindari penggunaan `NULL` kecuali benar-benar diperlukan.  
- Gunakan **snake_case** untuk nama tabel dan kolom.  

### 8.2 Multi-Tenant Strategy

- Setiap tabel wajib menyertakan kolom `tenant_id`.  
- Query harus selalu difilter berdasarkan `tenant_id`.  
- Jangan pernah expose data lintas tenant.  

### 8.3 Relasi Antar Module

- Gunakan foreign key dengan `ON DELETE CASCADE` bila relasi harus ikut terhapus.  
- Relasi antar module:  
  - `User` ↔ `Task` (`assigned_to`)  
  - `Customer` ↔ `Billing` (`customer_id`)  
  - `Finance` ↔ `Billing` (`finance_id`)  
- Hindari relasi terlalu kompleks; gunakan service layer untuk agregasi.  

### 8.4 Naming Convention

- Tabel: `module_entity` (contoh: `auth_user`, `crm_customer`, `finance_invoice`).  
- Kolom: gunakan snake_case (`customer_id`, `invoice_number`).  
- Index: beri nama sesuai pola `idx_<table>_<column>`.  

### 8.5 Migration

- Semua perubahan schema dilakukan via **Prisma migration**.  
- Jangan edit tabel langsung di DB.  
- Migration harus di-review sebelum merge.  

### 8.6 Performance

- Gunakan index pada kolom yang sering dipakai filter (`tenant_id`, `email`, `created_at`).  
- Hindari query lintas tenant.  
- Gunakan caching (**Redis**) untuk query berat.  
