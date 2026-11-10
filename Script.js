
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