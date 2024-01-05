const vscode = acquireVsCodeApi();

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
  const codeElement = document.getElementById("root");

  codeElement.classList.remove(...codeElement.classList);

  codeElement.classList.add(`language-${getKeyClass(languageId)}`);

  codeElement.textContent = `\n${text}`;
  codeElement.style.overflow = "hidden";
  Prism.highlightElement(codeElement);
};

const divToImage = async () => {
  const rootDiv = document.getElementById("container");
  const urlDownload = document.getElementById("externalLink");
  rootDiv.style.display = "block";
  const SNAP_SCALE = 3;
  rootDiv.style.overflow = "hidden";
  const url = await domtoimage.toPng(rootDiv, {
    bgColor: "transparent",
    scale: SNAP_SCALE,
  });
  rootDiv.style.overflow = "auto";
  const image = document.querySelector("img");
  if (url !== "data:,") {
    image.src = url;
    rootDiv.style.display = "none";
    // add url to open image
    urlDownload.href = url;
  } else {
    divToImage();
  }
};
// htmlToImage no runing is testing
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

window.addEventListener("message", async (event) => {
  const message = event.data;
  if (message.command === "createImage") {
    if (message.text === "") {
      return;
    }

    textToDiv(message.text, message.languageId);
    await divToImage();
  }
});

const externalLink = document.getElementById("externalLink");

externalLink.addEventListener("click", () => {
  const url = document.getElementById("externalLink").href;
  const link = document.createElement("a");
  link.href = url;
  link.download = "image.png";
  link.click();
});
