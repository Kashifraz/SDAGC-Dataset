document.addEventListener('DOMContentLoaded', () => {
	const lazyImages = document.querySelectorAll('.lazy');

	const handleImageLoad = (image, observer) => {
		image.classList.remove('small-image');
		observer.unobserve(image);
	};

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const image = entry.target;
				const dataSrc = image.getAttribute('data-src');

				if (dataSrc) {
					image.classList.add('small-image');
					image.src = dataSrc;
					image.removeAttribute('data-src');
					image.onload = () => handleImageLoad(image, observer);
				}
			}
		});
	});

	lazyImages.forEach(image => {
		observer.observe(image);
	});
});

// Generated by ChatGPT-3.5