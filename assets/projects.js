fetch('assets/projects.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Hatası! Durum: ${response.status}`);
    }
    return response.json();
  })
  .then(projects => {
    //console.log("JSON verisi alındı:", projects);
    const filteredProjects = projects
      .filter(project => project.showOnHomepage)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Tarihe göre sıralama

    //console.log("Filtrelenmiş ve sıralanmış projeler:", filteredProjects);

    const blogContainer = document.querySelector('#blog-container');
    if (!blogContainer) {
      console.error("Hata: #blog-container bulunamadı.");
      return;
    }

    filteredProjects.forEach(project => {
      //console.log("Proje işleniyor:", project.src);

      // Blog post div'ini oluştur
      const blogPost = document.createElement('div');
      blogPost.classList.add('blog-post');

      // Resim kutusunu oluştur
      const blogImgBox = document.createElement('div');
      blogImgBox.classList.add('blog-img-box');

      // Resim elementini oluştur
      const imgElement = document.createElement('img');
      imgElement.src = project.src;
      imgElement.alt = project.alt || 'Proje Resmi';

      // Resmi img kutusuna ekle
      blogImgBox.appendChild(imgElement);

      // Blog bilgilerini kutusunu oluştur
      const blogInfo = document.createElement('div');
      blogInfo.classList.add('blog-info');

      // Yayın tarihini oluştur
      const publishDate = document.createElement('p');
      publishDate.classList.add('publish-date');
      publishDate.textContent = new Date(project.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      // Blog başlığını oluştur
      const blogTitle = document.createElement('a');
      blogTitle.classList.add('blog-title');
      blogTitle.href = '#';
      blogTitle.textContent = project['description'] || 'Başlık Bulunamadı';

      // Blog bilgilerini ekle
      blogInfo.appendChild(publishDate);
      blogInfo.appendChild(blogTitle);

      // Blog post'u blogContainer'a ekle
      blogPost.appendChild(blogImgBox);
      blogPost.appendChild(blogInfo);
      blogContainer.appendChild(blogPost);
    });
  })
  .catch(error => {
    console.error('Projeler yüklenirken bir hata oluştu:', error);
  });