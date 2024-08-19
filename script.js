document.addEventListener('DOMContentLoaded', () => {
    // Array of manga page URLs
    const mangaPages = [
        'page1.jpg',
        'page2.jpg',
        'page3.jpg'
        // Add more pages as needed
    ];

    let currentPage = 0;

    const mangaImage = document.getElementById('manga-image');
    const prevChapterBtn = document.getElementById('prev-chapter');
    const nextChapterBtn = document.getElementById('next-chapter');

    function updatePage() {
        mangaImage.src = mangaPages[currentPage];
    }

    prevChapterBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updatePage();
        }
    });

    nextChapterBtn.addEventListener('click', () => {
        if (currentPage < mangaPages.length - 1) {
            currentPage++;
            updatePage();
        }
    });

    // Load the first page initially
    updatePage();
});
