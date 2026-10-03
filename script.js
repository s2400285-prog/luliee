const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicDisc = document.getElementById("musicDisc");

const photo = document.getElementById("juliePhoto");
const photoNumber = document.getElementById("photoNumber");
const photoMessage = document.getElementById("photoMessage");
const photoCard = document.getElementById("photoCard");

const photos = [
  "julie1.jpg",
  "julie2.jpg",
  "julie3.jpg",
  "julie4.jpg",
  "julie5.jpg",
];

const photoMessages = [
  "This picture is cute, but you know what's cuter? You. ❤️",
  "Okay... why do you look this good gid? 😭❤️",
  "You have this way of making a simple picture feel special.",
  "Honestly, I could look at this picture for a while lang. 🥹",
  "And here I am again... smiling because it's you. ❤️",
];

let currentPhoto = 0;
let touchStartX = 0;
let touchEndX = 0;

function startJourney() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("photoSection").classList.remove("hidden");

  bgMusic.volume = 0.45;

  bgMusic
    .play()
    .then(function () {
      musicButton.textContent = "❚❚";
      musicDisc.classList.add("playing");
    })
    .catch(function () {
      musicButton.textContent = "▶";
    });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play().then(function () {
      musicButton.textContent = "❚❚";
      musicDisc.classList.add("playing");
    });
  } else {
    bgMusic.pause();
    musicButton.textContent = "▶";
    musicDisc.classList.remove("playing");
  }
}

function nextPhoto() {
  currentPhoto++;

  if (currentPhoto >= photos.length) {
    currentPhoto = 0;
  }

  updatePhoto();
}

function previousPhoto() {
  currentPhoto--;

  if (currentPhoto < 0) {
    currentPhoto = photos.length - 1;
  }

  updatePhoto();
}

function updatePhoto() {
  photo.style.opacity = "0";

  setTimeout(function () {
    photo.src = photos[currentPhoto];
    photoNumber.textContent = `${currentPhoto + 1} / ${photos.length}`;
    photoMessage.textContent = photoMessages[currentPhoto];
    photo.style.opacity = "1";
  }, 200);
}

function showMessage() {
  document.getElementById("photoSection").classList.add("hidden");
  document.getElementById("messageSection").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function showSecret() {
  document.getElementById("messageSection").classList.add("hidden");
  document.getElementById("secretSection").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function showFinal() {
  document.getElementById("secretSection").classList.add("hidden");
  document.getElementById("finalSection").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function restartPage() {
  document.getElementById("finalSection").classList.add("hidden");
  document.getElementById("intro").classList.remove("hidden");

  currentPhoto = 0;

  updatePhoto();

  bgMusic.pause();
  bgMusic.currentTime = 0;

  musicButton.textContent = "▶";
  musicDisc.classList.remove("playing");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

photoCard.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].screenX;
});

photoCard.addEventListener("touchend", function (event) {
  touchEndX = event.changedTouches[0].screenX;

  const difference = touchStartX - touchEndX;

  if (Math.abs(difference) < 50) {
    return;
  }

  if (difference > 0) {
    nextPhoto();
  } else {
    previousPhoto();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    nextPhoto();
  }

  if (event.key === "ArrowLeft") {
    previousPhoto();
  }
});
