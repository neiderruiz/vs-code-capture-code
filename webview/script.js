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

    // conserve colors default
    const color = window.localStorage.getItem("color");
    const colorHexa = window.localStorage.getItem("color-hexa");
    const rootDiv = document.getElementById("container");
    // remove all class
    rootDiv.classList.remove(...rootDiv.classList);
    
    // load color default
    if (color) {
      rootDiv.style.backgroundColor = "";
      rootDiv.classList.add(color, "rounded-2xl", "px-5", "py-2");
    }
    // load color hexa default
    if (colorHexa) {
      rootDiv.classList.add("rounded-2xl", "px-5", "py-2");
      rootDiv.style.backgroundColor = colorHexa;
    }

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

const changeColor = document.getElementById("change-color");

changeColor.addEventListener("input", async () => {
  const color = document.getElementById("change-color").value;
  const rootDiv = document.getElementById("container");
  rootDiv.style.backgroundColor = color;
  rootDiv.classList.add("rounded-2xl", "px-5", "py-2");
  // remove color localstorage
  window.localStorage.removeItem("color");
  // conserve colors default
  window.localStorage.setItem("color-hexa", color);

  await divToImage();
});

const defaultsColors = document.getElementsByClassName("defaults-colors");

Array.from(defaultsColors).forEach((color) => {
  color.addEventListener("click", async (e) => {
    // get color data
    const colorClass = e.target.dataset.color; 
    const rootDiv = document.getElementById("container");
    // remove all class
    rootDiv.style.backgroundColor = "";
    rootDiv.classList.remove(...rootDiv.classList);
    rootDiv.classList.add(colorClass, "rounded-2xl", "px-5", "py-2");

    // remove hexa color localstorage
    window.localStorage.removeItem("color-hexa");
    // conserve colors default
    window.localStorage.setItem("color", colorClass);

    await divToImage();

  });
});


const neiderruiz = document.getElementById('neiderruiz');

externalLink.addEventListener('click', () => {
  vscode.postMessage({ command: 'openExternalUrl', url: 'https://example.com' });
});

const devsbrand = document.getElementById('devsbrand');

externalLink.addEventListener('click', () => {
  vscode.postMessage({ command: 'openExternalUrl', url: 'https://example.com' });
});