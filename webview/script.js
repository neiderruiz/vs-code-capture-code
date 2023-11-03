const getKeyClass = (languageId) => {
  switch (languageId) {
    case "javascriptreact":
      return "jsx";

    default:
      return languageId;
  }
};

const textToDiv = (text, languageId) => {
  text = text.trim();
  let codeElement = document.getElementById("root");

  // re,ove a
  //   remove all class
  codeElement.classList.remove(...codeElement.classList);

  codeElement.classList.add(`language-${getKeyClass(languageId)}`);

  codeElement.textContent = `\n${text}`;
  codeElement.style.overflow = "hidden";
  Prism.highlightElement(codeElement);
};

const divToImage = async () => {
  const rootDiv = document.getElementById("container");
  const SNAP_SCALE = 3;
  rootDiv.style.overflow = "hidden";
  const url = await domtoimage.toPng(rootDiv, {
    bgColor: "transparent",
    scale: SNAP_SCALE,
  });
  rootDiv.style.overflow = "auto";
  const image = document.querySelector("img");
  image.src = url;
};

const convertImage = () => {
  const rootDiv = document.getElementById("container");
  htmlToImage
    .toPng(rootDiv, {
      scale: 3,
    })
    .then(function (dataUrl) {
      document.querySelector("img").src = dataUrl;
      document.getElementById("open_image").href = dataUrl;
      document.getElementById("open_image").innerHTML = dataUrl;
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};

window.addEventListener("message", (event) => {
  const message = event.data;
  if (message.command === "createImage") {
    textToDiv(message.text, message.languageId);
    divToImage();
  }
});
