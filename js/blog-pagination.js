// Blog functionality + pagination (10 posts per page)
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        const isNetlify = newsletterForm.hasAttribute('data-netlify');
        newsletterForm.addEventListener('submit', function(e) {
            if (isNetlify) return; // let Netlify handle the POST
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (!email) {
                alert('Please enter a valid email address.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Thank you for subscribing! You\'ll receive updates on new articles.');
            emailInput.value = '';
        });
    }

    // Pagination + search
    const allPosts = Array.from(document.querySelectorAll('.blog-post'));
    const postsPerPage = 10;
    let filteredPosts = allPosts.slice();
    let isSearching = false;

    const pagination = document.getElementById('blogPagination');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    function getPageFromURL() {
        const p = parseInt(new URL(window.location.href).searchParams.get('page') || '1', 10);
        return isNaN(p) || p < 1 ? 1 : p;
    }
    let currentPage = getPageFromURL();

    function updateURL() {
        const url = new URL(window.location.href);
        if (currentPage === 1) {
            url.searchParams.delete('page');
        } else {
            url.searchParams.set('page', String(currentPage));
        }
        window.history.replaceState({}, '', url);
    }

    function render() {
        // Hide everything first
        allPosts.forEach(p => p.style.display = 'none');

        if (isSearching) {
            filteredPosts.forEach(p => p.style.display = 'block');
            if (pagination) pagination.style.display = 'none';
            return;
        }

        const totalItems = filteredPosts.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / postsPerPage));
        if (currentPage > totalPages) currentPage = totalPages;

        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const toShow = filteredPosts.slice(start, end);
        toShow.forEach(p => p.style.display = 'block');

        if (pagination) {
            pagination.style.display = totalPages > 1 ? 'flex' : 'none';
            if (pageIndicator) pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
            if (prevBtn) prevBtn.disabled = currentPage <= 1;
            if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
        }
        updateURL();
    }

    if (prevBtn) prevBtn.addEventListener('click', function() {
        if (currentPage > 1) { currentPage -= 1; render(); }
    });
    if (nextBtn) nextBtn.addEventListener('click', function() {
        const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
        if (currentPage < totalPages) { currentPage += 1; render(); }
    });

    // Blog search functionality integrates with pagination
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const term = this.value.toLowerCase().trim();
            isSearching = term.length > 0;
            filteredPosts = allPosts.filter(post => {
                const title = (post.querySelector('.blog-post-title')?.textContent || '').toLowerCase();
                const excerpt = (post.querySelector('.blog-post-excerpt')?.textContent || '').toLowerCase();
                const tags = Array.from(post.querySelectorAll('.blog-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
                return title.includes(term) || excerpt.includes(term) || tags.includes(term);
            });
            if (!isSearching) {
                filteredPosts = allPosts.slice();
                currentPage = 1;
            }
            render();
        });
    }

    // Initial render
    render();
});

