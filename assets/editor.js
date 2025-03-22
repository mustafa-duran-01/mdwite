const jarvis = {
  gallery: {
      // Galeriyi listeleme komutu
      list: async function () {
          try {
              const response = await fetch('assets/gallery.json'); // Yerel sunucuya istek gönder
              if (!response.ok) throw new Error('Galeri verisi alınırken hata oluştu.');
              const data = await response.json();
              console.log('Galeri:', data);
          } catch (error) {
              console.error(error);
          }
      },

      // Galeriye fotoğraf ekleme komutu
      add: async function (image) {
          try {
              // Önce mevcut veriyi al
              const response = await fetch('/assets/gallery.json');
              if (!response.ok) throw new Error('Galeri verisi alınırken hata oluştu.');
              let galleryData = await response.json();

              // Yeni fotoğrafı ekle
              galleryData.push(image);

              // Yeni veriyi JSON dosyasına kaydetmek için PUT isteği gönder
              await this.saveGalleryData(galleryData);

              console.log('Fotoğraf başarıyla eklendi.');
          } catch (error) {
              console.error(error);
          }
      },

      // Galeriden fotoğraf silme komutu
      remove: async function (imageId) {
          try {
              // Önce mevcut veriyi al
              const response = await fetch('/assets/gallery.json');
              if (!response.ok) throw new Error('Galeri verisi alınırken hata oluştu.');
              let galleryData = await response.json();

              // Fotoğrafı sil
              galleryData = galleryData.filter(image => image.id !== imageId);

              // Yeni veriyi JSON dosyasına kaydetmek için PUT isteği gönder
              await this.saveGalleryData(galleryData);

              console.log('Fotoğraf başarıyla silindi.');
          } catch (error) {
              console.error(error);
          }
      },

      // Galeri verisini JSON dosyasına kaydetmek için yardımcı fonksiyon
      saveGalleryData: async function (data) {
          try {
              const response = await fetch('/assets/gallery.json', {
                  method: 'PUT', // PUT isteği ile veri güncelleme
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
              });
              if (!response.ok) throw new Error('Veri kaydedilirken hata oluştu.');
              console.log('Veri başarıyla kaydedildi.');
          } catch (error) {
              console.error(error);
          }
      }
  }
};
