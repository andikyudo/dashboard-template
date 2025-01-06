# React Dashboard

Sebuah aplikasi dashboard modern yang dibangun menggunakan React, TypeScript, dan Tailwind CSS. Aplikasi ini menyediakan berbagai komponen UI yang reusable dan fitur-fitur interaktif seperti drag-and-drop, tabel data, dan kalender.

## Fitur Utama
- Sistem tema (light/dark mode)
- Komponen UI yang reusable
- Drag-and-drop cards
- Tabel data dengan fitur sorting dan pagination
- Kalender interaktif
- Error boundary untuk handling error
- Search bar dengan autocomplete
- Profile settings

## Struktur Direktori

```
react-dashboard/
├── public/              # Static assets
├── src/
│   ├── components/      # Komponen UI reusable
│   │   ├── Calendar/    # Komponen kalender
│   │   ├── Card/        # Berbagai variasi card UI
│   │   ├── DragDropCards/ # Komponen drag-and-drop
│   │   ├── DraggableCard/ # Canvas dan card draggable
│   │   ├── Menu/        # Menu navigasi
│   │   ├── Profile/     # Komponen profil user
│   │   ├── SearchBar/   # Search bar dengan autocomplete
│   │   ├── Settings/    # Pengaturan aplikasi
│   │   ├── Sidebar/     # Sidebar navigasi
│   │   ├── Table/       # Komponen tabel data
│   ├── context/         # Context API untuk state management
│   ├── pages/           # Halaman-halaman utama
│   ├── App.tsx          # Root component
│   ├── index.tsx        # Entry point aplikasi
├── package.json         # Dependencies dan scripts
├── tailwind.config.js   # Konfigurasi Tailwind CSS
├── tsconfig.json        # Konfigurasi TypeScript
```

## Teknologi yang Digunakan
- **React** - Library JavaScript untuk membangun UI
- **TypeScript** - Superset JavaScript dengan type checking
- **Tailwind CSS** - Utility-first CSS framework
- **React Beautiful DnD** - Library untuk drag-and-drop
- **React Table** - Library untuk tabel data
- **React Error Boundary** - Error handling component

## Panduan Pengembangan

### Prasyarat
- Node.js (v16 atau lebih baru)
- npm (v8 atau lebih baru)

### Instalasi
1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm start
   ```

### Scripts
- `npm start` - Menjalankan development server
- `npm test` - Menjalankan test suite
- `npm run build` - Membuat production build
- `npm run lint` - Menjalankan ESLint

## Kontribusi
1. Fork repository
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan Anda (`git commit -am 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi
[MIT](https://choosealicense.com/licenses/mit/)
