// Add a button to launch the dashboard from the main website
document.addEventListener('DOMContentLoaded', function() {
    // Change this URL to your actual dashboard URL on Render
    const dashboardUrl = 'https://my-portfolio-tz8x.onrender.com/dashboard.html';
    let dashBtn = document.getElementById('dashboard-launch-btn');
    if (!dashBtn) {
        dashBtn = document.createElement('button');
        dashBtn.id = 'dashboard-launch-btn';
        dashBtn.textContent = 'Go to Dashboard';
        dashBtn.style = 'position:fixed;bottom:24px;right:24px;z-index:9999;padding:0.8rem 1.2rem;background:#0078d7;color:#fff;border:none;border-radius:8px;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,0.10);cursor:pointer;';
        dashBtn.onclick = function() {
            window.open(dashboardUrl, '_blank');
        };
        document.body.appendChild(dashBtn);
    }
});
// Utility: add change buttons to all media items in edit mode
function addMediaChangeButtons() {
    const mediaGallery = document.getElementById('media-gallery');
    if (!mediaGallery) return;
    // Remove old change buttons
    Array.from(mediaGallery.querySelectorAll('.media-change-btn')).forEach(btn => btn.remove());
    // Add new change buttons
    Array.from(mediaGallery.children).forEach(item => {
        if (!item.classList.contains('media-item') && (item.tagName === 'IMG' || item.tagName === 'VIDEO')) {
            item.classList.add('media-item');
        }
        if (item.classList.contains('media-item')) {
            let btn = document.createElement('button');
            btn.textContent = 'Change';
            btn.type = 'button';
            btn.className = 'media-change-btn';
            btn.style = 'display:none;margin:0.5rem 0 0 0;';
            btn.addEventListener('click', function() {
                const choice = prompt('Type "url" to use an image/video link, or "file" to upload from your device:');
                if (!choice) return;
                if (choice.trim().toLowerCase() === 'url') {
                    const url = prompt('Paste image or video URL:');
                    if (url && url.trim() !== '') {
                        if (item.tagName.toLowerCase() === 'img') {
                            item.src = url.trim();
                        } else if (item.tagName.toLowerCase() === 'video') {
                            item.innerHTML = '';
                            let source = document.createElement('source');
                            source.src = url.trim();
                            source.type = 'video/' + url.split('.').pop();
                            item.appendChild(source);
                        }
                    }
                } else if (choice.trim().toLowerCase() === 'file') {
                    let tempInput = document.createElement('input');
                    tempInput.type = 'file';
                    tempInput.accept = 'image/*,video/*';
                    tempInput.style.display = 'none';
                    tempInput.addEventListener('change', function(e) {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = function(evt) {
                                if (item.tagName.toLowerCase() === 'img') {
                                    item.src = evt.target.result;
                                } else if (item.tagName.toLowerCase() === 'video') {
                                    item.innerHTML = '';
                                    let source = document.createElement('source');
                                    source.src = evt.target.result;
                                    source.type = file.type;
                                    item.appendChild(source);
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                    document.body.appendChild(tempInput);
                    tempInput.click();
                    setTimeout(() => tempInput.remove(), 1000);
                }
            });
            item.insertAdjacentElement('afterend', btn);
        }
    });
}

// Show/hide change buttons in edit mode
function toggleMediaChangeButtons(editMode) {
    const mediaGallery = document.getElementById('media-gallery');
    if (!mediaGallery) return;
    Array.from(mediaGallery.querySelectorAll('.media-change-btn')).forEach(btn => {
        btn.style.display = editMode ? 'inline-block' : 'none';
    });
}

// Attach to edit mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('edit-toggle');
    let editMode = false;
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            editMode = !editMode;
            addMediaChangeButtons();
            toggleMediaChangeButtons(editMode);
        });
        // Initial state
        addMediaChangeButtons();
        toggleMediaChangeButtons(editMode);
    }
    // Also add change buttons when new media is added
    const mediaGallery = document.getElementById('media-gallery');
    if (mediaGallery) {
        const observer = new MutationObserver(() => {
            addMediaChangeButtons();
            toggleMediaChangeButtons(editMode);
        });
        observer.observe(mediaGallery, { childList: true });
    }
});
// Add change button to each media item in edit mode
function addMediaChangeButtons() {
    if (!mediaGallery) return;
    // Remove old change buttons
    Array.from(mediaGallery.querySelectorAll('.media-change-btn')).forEach(btn => btn.remove());
    // Add new change buttons
    Array.from(mediaGallery.children).forEach(item => {
        if (!item.classList.contains('media-item')) {
            item.classList.add('media-item');
        }
        let btn = document.createElement('button');
        btn.textContent = 'Change';
        btn.type = 'button';
        btn.className = 'media-change-btn';
        btn.style = 'display:none;margin:0.5rem 0 0 0;';
        btn.addEventListener('click', function() {
            // Option dialog
            const choice = prompt('Type "url" to use an image/video link, or "file" to upload from your device:');
            if (!choice) return;
            if (choice.trim().toLowerCase() === 'url') {
                const url = prompt('Paste image or video URL:');
                if (url && url.trim() !== '') {
                    if (item.tagName.toLowerCase() === 'img') {
                        item.src = url.trim();
                    } else if (item.tagName.toLowerCase() === 'video') {
                        item.innerHTML = '';
                        let source = document.createElement('source');
                        source.src = url.trim();
                        source.type = 'video/' + url.split('.').pop();
                        item.appendChild(source);
                    }
                }
            } else if (choice.trim().toLowerCase() === 'file') {
                // Create a temp file input
                let tempInput = document.createElement('input');
                tempInput.type = 'file';
                tempInput.accept = 'image/*,video/*';
                tempInput.style.display = 'none';
                tempInput.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(evt) {
                            if (item.tagName.toLowerCase() === 'img') {
                                item.src = evt.target.result;
                            } else if (item.tagName.toLowerCase() === 'video') {
                                item.innerHTML = '';
                                let source = document.createElement('source');
                                source.src = evt.target.result;
                                source.type = file.type;
                                item.appendChild(source);
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                });
                document.body.appendChild(tempInput);
                tempInput.click();
                setTimeout(() => tempInput.remove(), 1000);
            }
        });
        item.insertAdjacentElement('afterend', btn);
    });
}

// Show/hide change buttons in edit mode
if (mediaBtns && editBtn) {
    const toggleMediaBtns = () => {
        mediaBtns.style.display = (editMode || document.body.classList.contains('editing')) ? 'flex' : 'none';
        Array.from(mediaGallery.querySelectorAll('.media-change-btn')).forEach(btn => {
            btn.style.display = (editMode || document.body.classList.contains('editing')) ? 'inline-block' : 'none';
        });
    };
    editBtn.addEventListener('click', () => {
        toggleMediaBtns();
        addMediaChangeButtons();
    });
    toggleMediaBtns();
    addMediaChangeButtons();
}

// Also add change buttons when new media is added
if (mediaGallery) {
    const observer = new MutationObserver(() => {
        addMediaChangeButtons();
    });
    observer.observe(mediaGallery, { childList: true });
}
// Media section: add image/video from device or URL
const mediaBtns = document.getElementById('media-btns');
const mediaFileBtn = document.getElementById('media-file-btn');
const mediaUrlBtn = document.getElementById('media-url-btn');
const mediaTextBtn = document.getElementById('media-text-btn');
const mediaAnyFileBtn = document.getElementById('media-anyfile-btn');
const mediaUpload = document.getElementById('media-upload');
const mediaAnyFileUpload = document.getElementById('media-anyfile-upload');
const mediaGallery = document.getElementById('media-gallery');
// Show/hide media buttons in edit mode
if (mediaBtns && editBtn) {
    const toggleMediaBtns = () => {
        mediaBtns.style.display = (editMode || document.body.classList.contains('editing')) ? 'flex' : 'none';
    };
    editBtn.addEventListener('click', toggleMediaBtns);
    toggleMediaBtns();
}
// Add from device
if (mediaFileBtn && mediaUpload && mediaGallery) {
    mediaFileBtn.addEventListener('click', function() {
        mediaUpload.click();
    });
    mediaUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                let el;
                if (file.type.startsWith('image/')) {
                    el = document.createElement('img');
                    el.src = evt.target.result;
                    el.alt = 'User Image';
                } else if (file.type.startsWith('video/')) {
                    el = document.createElement('video');
                    el.controls = true;
                    const source = document.createElement('source');
                    source.src = evt.target.result;
                    source.type = file.type;
                    el.appendChild(source);
                }
                if (el) {
                    el.setAttribute('contenteditable', 'false');
                    mediaGallery.appendChild(el);
                }
            };
            reader.readAsDataURL(file);
        }
    });
}
// Add from URL
if (mediaUrlBtn && mediaGallery) {
    mediaUrlBtn.addEventListener('click', function() {
        const url = prompt('Paste image or video URL:');
        if (url && url.trim() !== '') {
            let el;
            if (url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i)) {
                el = document.createElement('img');
                el.src = url.trim();
                el.alt = 'User Image';
            } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
                el = document.createElement('video');
                el.controls = true;
                const source = document.createElement('source');
                source.src = url.trim();
                source.type = 'video/' + url.split('.').pop();
                el.appendChild(source);
            }
            if (el) {
                el.setAttribute('contenteditable', 'false');
                mediaGallery.appendChild(el);
            }
        }
    });
}
// Add text
if (mediaTextBtn && mediaGallery) {
    mediaTextBtn.addEventListener('click', function() {
        const text = prompt('Enter the text to add:');
        if (text && text.trim() !== '') {
            const el = document.createElement('div');
            el.textContent = text.trim();
            el.className = 'media-text';
            el.setAttribute('contenteditable', 'true');
            el.style.padding = '0.5rem 1rem';
            el.style.background = '#f8f9fa';
            el.style.borderRadius = '8px';
            el.style.marginBottom = '0.5rem';
            el.style.fontSize = '1.1rem';
            mediaGallery.appendChild(el);
        }
    });
}

// Add any file (with download link)
if (mediaAnyFileBtn && mediaAnyFileUpload && mediaGallery) {
    mediaAnyFileBtn.addEventListener('click', function() {
        mediaAnyFileUpload.click();
    });
    mediaAnyFileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name;
            link.textContent = `Download: ${file.name}`;
            link.className = 'media-file-link';
            link.style.display = 'block';
            link.style.marginBottom = '0.5rem';
            link.style.background = '#e3eafc';
            link.style.padding = '0.5rem 1rem';
            link.style.borderRadius = '8px';
            link.style.textDecoration = 'none';
            link.style.color = '#0078d7';
            mediaGallery.appendChild(link);
        }
    });
}

// Responsive nav menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Animate sections on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const fadeInOnScroll = () => {
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.style.animationPlayState = 'running';
        }
    });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Simple form handler (no backend)
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch('https://my-portfolio-tz8x.onrender.com/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.elements[0].value,
                email: form.elements[1].value,
                message: form.elements[2].value
            })
        }).then(res => res.json()).then(data => {
            alert('Thank you for your message!');
            form.reset();
        });
    });
}

// Inline edit mode toggle for all editable sections
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('edit-toggle');
    const editableSections = document.querySelectorAll('.editable-section, .editable-section *');
    let editMode = false;
    editBtn.addEventListener('click', function() {
        editMode = !editMode;
        editableSections.forEach(el => {
            el.setAttribute('contenteditable', editMode ? 'true' : 'false');
            el.classList.toggle('editing', editMode);
        });
        editBtn.textContent = editMode ? 'View Mode' : 'Edit Mode';
    });

    // Hero avatar change (local file or URL)
    const heroAvatar = document.getElementById('hero-avatar');
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarBtns = document.getElementById('avatar-btns');
    const avatarFileBtn = document.getElementById('avatar-file-btn');
    const avatarUrlBtn = document.getElementById('avatar-url-btn');
    if (heroAvatar && avatarUpload && avatarBtns && avatarFileBtn && avatarUrlBtn) {
        // Show/hide the avatar buttons in edit mode
        const toggleAvatarBtns = () => {
            avatarBtns.style.display = (heroAvatar.getAttribute('contenteditable') === 'true' || heroAvatar.classList.contains('editing')) ? 'flex' : 'none';
        };
        editBtn.addEventListener('click', toggleAvatarBtns);
        toggleAvatarBtns();

        avatarFileBtn.addEventListener('click', function() {
            avatarUpload.click();
        });
        avatarUrlBtn.addEventListener('click', function() {
            const url = prompt('Paste image URL:');
            if (url && url.trim() !== '') {
                heroAvatar.src = url.trim();
            }
        });
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    heroAvatar.src = evt.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Add support for text and any file in the media section
document.addEventListener('DOMContentLoaded', function() {
    const mediaBtns = document.getElementById('media-btns');
    const mediaFileBtn = document.getElementById('media-file-btn');
    const mediaUrlBtn = document.getElementById('media-url-btn');
    const mediaTextBtn = document.getElementById('media-text-btn');
    const mediaAnyFileBtn = document.getElementById('media-anyfile-btn');
    const mediaUpload = document.getElementById('media-upload');
    const mediaAnyFileUpload = document.getElementById('media-anyfile-upload');
    const mediaGallery = document.getElementById('media-gallery');
    const editBtn = document.getElementById('edit-toggle');
    let editMode = false;

    // Show/hide media buttons in edit mode
    if (mediaBtns && editBtn) {
        editBtn.addEventListener('click', function() {
            editMode = !editMode;
            mediaBtns.style.display = editMode ? 'flex' : 'none';
        });
        mediaBtns.style.display = 'none';
    }

    // Add from device (image/video)
    if (mediaFileBtn && mediaUpload && mediaGallery) {
        mediaFileBtn.addEventListener('click', function() {
            mediaUpload.click();
        });
        mediaUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    let el;
                    if (file.type.startsWith('image/')) {
                        el = document.createElement('img');
                        el.src = evt.target.result;
                        el.alt = 'User Image';
                    } else if (file.type.startsWith('video/')) {
                        el = document.createElement('video');
                        el.controls = true;
                        const source = document.createElement('source');
                        source.src = evt.target.result;
                        source.type = file.type;
                        el.appendChild(source);
                    }
                    if (el) {
                        el.setAttribute('contenteditable', 'false');
                        mediaGallery.appendChild(el);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Add from URL (image/video)
    if (mediaUrlBtn && mediaGallery) {
        mediaUrlBtn.addEventListener('click', function() {
            const url = prompt('Paste image or video URL:');
            if (url && url.trim() !== '') {
                let el;
                if (url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i)) {
                    el = document.createElement('img');
                    el.src = url.trim();
                    el.alt = 'User Image';
                } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
                    el = document.createElement('video');
                    el.controls = true;
                    const source = document.createElement('source');
                    source.src = url.trim();
                    source.type = 'video/' + url.split('.').pop();
                    el.appendChild(source);
                }
                if (el) {
                    el.setAttribute('contenteditable', 'false');
                    mediaGallery.appendChild(el);
                }
            }
        });
    }

    // Add text
    if (mediaTextBtn && mediaGallery) {
        mediaTextBtn.addEventListener('click', function() {
            const text = prompt('Enter the text to add:');
            if (text && text.trim() !== '') {
                const el = document.createElement('div');
                el.textContent = text.trim();
                el.className = 'media-text';
                el.setAttribute('contenteditable', 'true');
                el.style.padding = '0.5rem 1rem';
                el.style.background = '#f8f9fa';
                el.style.borderRadius = '8px';
                el.style.marginBottom = '0.5rem';
                el.style.fontSize = '1.1rem';
                mediaGallery.appendChild(el);
            }
        });
    }

    // Add any file (with download link)
    if (mediaAnyFileBtn && mediaAnyFileUpload && mediaGallery) {
        mediaAnyFileBtn.addEventListener('click', function() {
            mediaAnyFileUpload.click();
        });
        mediaAnyFileUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = url;
                link.download = file.name;
                link.textContent = `Download: ${file.name}`;
                link.className = 'media-file-link';
                link.style.display = 'block';
                link.style.marginBottom = '0.5rem';
                link.style.background = '#e3eafc';
                link.style.padding = '0.5rem 1rem';
                link.style.borderRadius = '8px';
                link.style.textDecoration = 'none';
                link.style.color = '#0078d7';
                mediaGallery.appendChild(link);
            }
        });
    }
});
