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

  render();
  restart();
}
