const lazyLoading = () => {
  const blocks = document.querySelectorAll(".lazy");
  const lazy = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = document.createElement("img");
        image.src = entry.target.dataset.src;
        entry.target.appendChild(image);
        entry.target.classList.remove("lazy");
        lazy.unobserve(entry.target);
      }
    });
  }, {});
  blocks.forEach((block) => {
    lazy.observe(block);
  });
};

export default lazyLoading;
