// Blog Modal Functionality
function openBlogModal(element) {
  const modal = document.getElementById("blogModal");
  const modalTitle = modal.querySelector(".blog-modal__title");
  const modalImage = modal.querySelector(".blog-modal__image img");
  const modalDate = modal.querySelector(".blog-modal__meta .date");
  const modalAuthor = modal.querySelector(".blog-modal__meta .author");
  const modalComments = modal.querySelector(".blog-modal__meta .comments");
  const modalLikes = modal.querySelector(".blog-modal__meta .likes");
  const modalContent = modal.querySelector(".blog-modal__text");
  const modalTags = modal.querySelector(".tags-container");

  // Get data from button attributes
  const title = element.getAttribute("data-title");
  const date = element.getAttribute("data-date");
  const author = element.getAttribute("data-author");
  const comments = element.getAttribute("data-comments");
  const likes = element.getAttribute("data-likes");
  const image = element.getAttribute("data-image");
  const content = element.getAttribute("data-content");
  const tags = element.getAttribute("data-tags");

  // Set modal content
  modalTitle.textContent = title;
  modalImage.src = image;
  modalDate.innerHTML = `<i class="fa fa-calendar"></i> ${date}`;
  modalAuthor.innerHTML = `<i class="fa fa-user"></i> ${author}`;
  modalComments.innerHTML = `<i class="fa fa-comment"></i> ${comments}`;
  modalLikes.innerHTML = `<i class="fa fa-heart"></i> ${likes}`;
  modalContent.innerHTML = content;

  // Create tags
  modalTags.innerHTML = tags
    .split(",")
    .map((tag) => `<span>${tag.trim()}</span>`)
    .join("");

  // Show modal with animation
  modal.classList.add("active");
  modal.querySelector(".blog-modal__content").classList.add("modal-animate-in");

  // Disable body scroll
  document.body.style.overflow = "hidden";
}

// Close modal function
function closeBlogModal() {
  const modal = document.getElementById("blogModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Close modal when clicking outside content
  const modal = document.getElementById("blogModal");
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeBlogModal();
    }
  });

  // Close modal when clicking close button
  const closeBtn = modal.querySelector(".blog-modal__close");
  closeBtn.addEventListener("click", closeBlogModal);

  // Close modal on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeBlogModal();
    }
  });
});

// Prevent modal content clicks from closing modal
document
  .querySelector(".blog-modal__content")
  .addEventListener("click", function (e) {
    e.stopPropagation();
  });
