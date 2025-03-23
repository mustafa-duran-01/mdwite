const jarvis = {
    // Galeri işlemleri
    gallery: {
      gallery: [],
  
      // Galeri verilerini yükle
      async loadGallery() {
        try {
          const response = await fetch('http://localhost:9221/images');
          if (!response.ok) throw new Error('Galeri yüklenirken hata oluştu.');
          this.gallery = await response.json();
          console.log('Galeri başarıyla yüklendi.');
        } catch (error) {
          console.error(error.message);
        }
      },
  
      // Galeri verilerini listele
      list() {
        if (this.gallery.length === 0) {
          console.log('Galeri boş.');
          return;
        }
        console.log('Galerideki Resimler:');
        this.gallery.forEach(image =>
          console.log(`ID: ${image.id}, Açıklama: ${image.description}`)
        );
      },
  
      // Yeni resim ekle
      add(src, description, date, category, photographer, location = 'Bilinmiyor', tags = [], comments = [], isFeatured = false, showOnHomepage = false) {
        const newImage = {
          id: this.gallery.length > 0 ? Math.max(...this.gallery.map(img => img.id)) + 1 : 1,
          src,
          description,
          date,
          category,
          photographer,
          location,
          tags,
          comments,
          isFeatured,
          showOnHomepage,
        };
  
        this.gallery.push(newImage);
        console.log(`Yeni resim eklendi: ID ${newImage.id}`);
        this.saveGallery();
      },
  
      // Resim sil
      delete(imageId) {
        const index = this.gallery.findIndex(image => image.id === imageId);
        if (index === -1) {
          console.log(`ID ${imageId} ile bir resim bulunamadı.`);
          return;
        }
        this.gallery.splice(index, 1);
        console.log(`Resim silindi: ID ${imageId}`);
        this.saveGallery();
      },
  
      // Galeri verilerini kaydet
      async saveGallery() {
        try {
          const response = await fetch('http://localhost:9221/save-gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.gallery),
          });
          if (!response.ok) throw new Error('Galeri kaydedilirken hata oluştu.');
          const result = await response.json();
          console.log(result.message);
        } catch (error) {
          console.error(error.message);
        }
      },
    },
  
    // Proje işlemleri

    projects: {
      projects: [],
  
      // Projeleri yükle
      async loadProjects() {
        try {
          const response = await fetch('/projects');
          if (!response.ok) throw new Error('Projeler yüklenirken hata oluştu.');
          this.projects = await response.json();
          console.log('Projeler başarıyla yüklendi.');
        } catch (error) {
          console.error(error.message);
        }
      },
  
      // Projeleri listele
      list() {
        if (this.projects.length === 0) {
          console.log('Proje bulunamadı.');
          return;
        }
        console.log('Projeler:');
        this.projects.forEach(project =>
          console.log(`ID: ${project.id}, Açıklama: ${project.description}`)
        );
      },
  
      // Yeni proje ekle
      add(src, description, date, category, creator, location = 'Bilinmiyor', tags = [], comments = [], isFeatured = false, showOnHomepage = false) {
        const newProject = {
          id: this.projects.length > 0 ? Math.max(...this.projects.map(proj => proj.id)) + 1 : 1,
          src,
          description,
          date,
          category,
          creator,
          location,
          tags,
          comments,
          isFeatured,
          showOnHomepage,
        };
  
        this.projects.push(newProject);
        console.log(`Yeni proje eklendi: ID ${newProject.id}`);
        this.saveProjects();
      },
  
      // Projeleri kaydet
      async saveProjects() {
        try {
          const response = await fetch('http://localhost:9221/save-projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.projects),
          });
          if (!response.ok) throw new Error('Projeler kaydedilirken hata oluştu.');
          const result = await response.json();
          console.log(result.message);
        } catch (error) {
          console.error(error.message);
        }
      },
    },
  };
  

// Sayfa yüklendiğinde galeriyi ve projeleri yükle
window.onload = () => {
    jarvis.gallery.loadGallery();
    jarvis.projects.loadProjects();
};