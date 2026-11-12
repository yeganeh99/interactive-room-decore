
const buttons = document.querySelectorAll(".color-btn[data-color]");

const items = {
  ".sofa": {
    folder: "Assets/sofa-colors",
    fileName: "AssetsColorssofa",
  },
  ".curtain": {
    folder: "Assets/Curtain",
    fileName: "Curtain",
  },
  ".lamp": {
    folder: "Assets/lamp",
    fileName: "Floorlamp",
  },
  ".wall-art": {
    folder: "Assets/Canva",
    fileName: "Wallart",
  },
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.dataset.color;
    const assetColor = `${color[0].toUpperCase()}${color.slice(1)}`;

    Object.entries(items).forEach(([selector, asset]) => {
      const image = document.querySelector(selector);

      image.src = `${asset.folder}/${asset.fileName}_${assetColor}.svg.svg`;
    });

  });
});

const room = document.querySelector(".room");
const plants = room.querySelectorAll(".plant1, .plant2, .plant3, .plant4");
const scratchHint = document.querySelector(".scratch-hint");
const successMessage = document.querySelector(".success-message");
const revealedPlants = new Set();
let activePointerId = null;
let lastPointerPosition = null;

function plantAtPoint(x, y) {
  return [...plants].find((plant) => {
    const bounds = plant.getBoundingClientRect();
    return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
  });
}

function revealPlant(plant) {
  if (revealedPlants.has(plant)) {
    return;
  }

  plant.classList.add("revealed");
  revealedPlants.add(plant);

  if (revealedPlants.size === plants.length) {
    scratchHint.hidden = true;
    successMessage.hidden = false;
  }
}

room.classList.add("scratch-ready");

room.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  activePointerId = event.pointerId;
  lastPointerPosition = { x: event.clientX, y: event.clientY };
});

room.addEventListener("pointermove", (event) => {
  if (event.pointerId !== activePointerId) {
    return;
  }

  const distance = Math.hypot(
    event.clientX - lastPointerPosition.x,
    event.clientY - lastPointerPosition.y,
  );
  lastPointerPosition = { x: event.clientX, y: event.clientY };
  if (distance < 1) {
    return;
  }

  const plant = plantAtPoint(event.clientX, event.clientY);
  if (plant) {
    revealPlant(plant);
  }
});

function stopScratching(event) {
  if (event.pointerId === activePointerId) {
    activePointerId = null;
    lastPointerPosition = null;
  }
}

room.addEventListener("pointerup", stopScratching);
room.addEventListener("pointercancel", stopScratching);