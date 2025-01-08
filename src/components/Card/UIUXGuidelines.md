# UI/UX Design Guidelines

## Prinsip Dasar UI/UX

1. **Konsistensi**
   - Gunakan komponen yang sama untuk fungsi yang sama
   - Pertahankan spacing dan padding yang konsisten
   - Contoh: Gunakan CardWithActions untuk semua card yang membutuhkan tombol aksi

2. **Hierarki Visual**
   - Gunakan ukuran font dan weight yang tepat
   - Contoh: HeaderCard menggunakan font lebih besar untuk judul
   - Gunakan warna untuk menekankan elemen penting

3. **Feedback**
   - Berikan feedback visual saat user berinteraksi
   - Contoh: Hover state pada tombol di CardWithActions
   - Animasi halus saat drag & drop di DraggableCard

4. **Kontrol User**
   - Berikan kontrol penuh kepada user
   - Contoh: DraggableCard memungkinkan user memposisikan card sesuai keinginan
   - StatsCard menunjukkan progress yang bisa diupdate

5. **Aksesibilitas**
   - Pastikan kontras warna memadai
   - Gunakan ARIA attributes untuk screen readers
   - Contoh: HeaderCard menggunakan icon dengan text alternatif

## Best Practices

1. **Spacing**
   - Gunakan spacing sistem (4px, 8px, 16px, etc)
   - Contoh: Card menggunakan padding 16px secara konsisten

2. **Warna**
   - Gunakan palette warna yang terdefinisi
   - Contoh: StatsCard menggunakan warna primary untuk progress bar

3. **Typography**
   - Batasi jumlah font family (maks 2)
   - Gunakan hierarchy yang jelas
   - Contoh: HeaderCard menggunakan font lebih besar untuk judul

4. **Responsiveness**
   - Desain untuk berbagai ukuran layar
   - Contoh: Grid layout di CardExamples responsive untuk mobile

## Referensi Belajar

1. [Material Design Guidelines](https://material.io/design)
2. [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
3. [Nielsen Norman Group Articles](https://www.nngroup.com/articles/)
4. [Refactoring UI](https://refactoringui.com/)
5. [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contoh Penerapan

```tsx
// Contoh Card dengan prinsip UI/UX yang baik
<CardWithActions
  title="Project Tasks"
  description="Manage your project tasks efficiently"
  actions={
    <>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Edit
      </button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Delete
      </button>
    </>
  }
/>
```

Tips:
- Gunakan utility classes Tailwind untuk konsistensi
- Buat komponen reusable
- Dokumentasikan semua komponen
- Test dengan berbagai user
