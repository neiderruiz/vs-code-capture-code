const textToDiv = (text) => {

  text = text.trim();
  let codeElement = document.getElementById("root");

  codeElement.textContent = text;

  Prism.highlightElement(codeElement);
};

const divToImage = async () => {
  const rootDiv = document.getElementById("container");
  const SNAP_SCALE = 3;
  const url = await domtoimage.toPng(rootDiv, {
    bgColor: "transparent",
    scale: SNAP_SCALE,
  });
  const image = document.querySelector("img");
  image.src = url;
};

window.addEventListener("message", (event) => {
  const message = event.data;
  if (message.command === "createImage") {
    textToDiv(message.text);
    divToImage();
  }
});
