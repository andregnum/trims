# 🐧 Ubuntu Dev Cheatsheet (Lengkap)

## 📂 File & Direktori

- `pwd` → path saat ini  
- `ls -la` → list + hidden + detail  
- `cd ..` → naik satu level  
- `mkdir -p parent/child` → buat nested folder  
- `rm -rf folder/` → hapus paksa folder  
- `cp -r src/ backup/` → copy folder  
- `mv old new` → rename / pindah  

## 📦 Package (APT)

- `sudo apt update && sudo apt upgrade` → update sistem  
- `sudo apt install git build-essential` → install package  
- `sudo apt remove nodejs` → hapus package  
- `apt search python3` → cari package  

## 🛠️ Development Tools

- **Git**: `git init`, `git clone URL`, `git commit -m "msg"`, `git push origin main`  
- **C/C++**: `gcc main.c -o main`, `g++ main.cpp -o main`  
- **Make**: `make`, `make clean`  
- **Python**: `python3 script.py`, `python3 -m venv venv`  
- **Node/NPM**: `node app.js`, `npm init -y`, `npm install express`  

## ⚙️ Proses & Sistem

- `ps aux` → list proses  
- `top` / `htop` → monitor CPU/mem  
- `kill -9 PID` → paksa hentikan proses  
- `df -h` → cek disk usage  
- `du -sh folder/` → ukuran folder  

## 👤 User & Hak Akses

- `whoami` → tampilkan user aktif  
- `id` → info user + group  
- `adduser namauser` → tambah user baru  
- `passwd namauser` → ubah password user  
- `usermod -aG sudo namauser` → tambahkan user ke group sudo  
- `deluser namauser` → hapus user  
- `groups namauser` → lihat group user  

### 🔑 Permission & Ownership

- `chmod 755 file` → set permission (rwxr-xr-x)  
- `chmod -R 644 folder/*` → set permission recursive  
- `chown user:group file` → ubah owner file  
- `chown -R user:group folder/` → ubah owner recursive  
- `umask` → default permission mask  

## 🌐 Networking

- `ping google.com` → cek koneksi  
- `curl https://api.github.com` → HTTP request  
- `wget URL` → download file  
- `ssh user@host` → remote login  
- `scp file user@host:/path` → copy file via SSH  

## 📂 Arsip & Kompresi

- `tar -cvf file.tar folder/` → buat arsip  
- `tar -xvf file.tar` → ekstrak arsip  
- `zip -r file.zip folder/` → kompres zip  
- `unzip file.zip` → ekstrak zip  

## 🧪 Testing & Container

- **Docker**:  
  `docker build -t myapp .`  
  `docker run -p 3000:3000 myapp`  
  `docker ps`  
- **Systemctl**:  
  `sudo systemctl start nginx`  
  `sudo systemctl status nginx`  
  `sudo systemctl enable nginx` → auto start saat boot  

## 🔍 Searching & Editing

- `grep "keyword" file.txt` → cari teks  
- `grep -r "keyword" src/` → cari recursive  
- `find / -name file.txt` → cari file  
- `nano file.txt` → edit file sederhana  
- `vim file.txt` → edit file advanced  

## ✅ Tips

- Gabung command:  
  `mkdir project && cd project && git init`  
- Manual:  
  `man ls`, `man git`, `man chmod`  
