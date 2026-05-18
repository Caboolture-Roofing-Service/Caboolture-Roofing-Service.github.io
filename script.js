document.getElementById("year").textContent = new Date().getFullYear();

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const track = carousel.querySelector(".review-carousel__track");
  const slides = Array.from(carousel.querySelectorAll(".review-slide"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");

  let index = 0;
  let timer;
  let touchStartX = 0;
  let touchStartY = 0;
  let isTouching = false;

  const dots = slides.map((_, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Review ${slideIndex + 1}`);
    dot.addEventListener("click", () => {
      index = slideIndex;
      render();
      restart();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  };

  const restart = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      index = (index + 1) % slides.length;
      render();
    }, 7000);
  };

  prevButton.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
    restart();
  });

  nextButton.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    render();
    restart();
  });

  carousel.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) {
        return;
      }

      isTouching = true;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (event) => {
      if (!isTouching) {
        return;
      }

      isTouching = false;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      index = deltaX < 0 ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
      render();
      restart();
    },
    { passive: true }
  );

  render();
  restart();
}
