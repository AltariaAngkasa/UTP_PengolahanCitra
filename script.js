let originalMat = null;

document.getElementById('imageInput').addEventListener('change', function (e) {
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      let canvas = document.getElementById('canvasOriginal');
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      let src = cv.imread(canvas);
      originalMat = src.clone(); 
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

function convertToGrayscale() {
  if (!originalMat) return;
  let gray = new cv.Mat();
  cv.cvtColor(originalMat, gray, cv.COLOR_RGBA2GRAY);
  cv.imshow('canvasOutput', gray);
  gray.delete();
}

function applyBrightness() {
  if (!originalMat) return;
  let value = parseInt(document.getElementById('brightness').value);
  let dst = new cv.Mat();
  originalMat.convertTo(dst, -1, 1, value);
  cv.imshow('canvasOutput', dst);
  dst.delete();
}

function equalizeHistogram() {
  if (!originalMat) return;
  let gray = new cv.Mat();
  let hist = new cv.Mat();
  cv.cvtColor(originalMat, gray, cv.COLOR_RGBA2GRAY);
  cv.equalizeHist(gray, hist);
  cv.imshow('canvasOutput', hist);
  gray.delete();
  hist.delete();
}
