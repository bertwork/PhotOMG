// DOM element reference
let previewContainerElement;
let cameraIdleElement;
let cameraPreviewElement;

// Camera state
let currentImage = null;
let isRetaking = false;

// Initialize camera module
export const setupCamera = () => {
  previewContainerElement = document.getElementById("preview-image");
  cameraIdleElement = document.getElementById("camera-idle");
  cameraPreviewElement = document.getElementById("camera-preview");

  document
    .getElementById("open-camera-btn")
    .addEventListener("click", openCamera);

  document
    .getElementById("discard-btn")
    .addEventListener("click", discardPreview);

  document.getElementById("retake-btn").addEventListener("click", retakePhoto);
};

const openCamera = () => {
  // Open native camera using cordova plugin
  navigator.camera.getPicture(handlePhotoSuccess, handlePhotoError, {
    quality: 70,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    encodingType: Camera.EncodingType.JPEG,
  });
};

const handlePhotoSuccess = (imageData) => {
  // Store image data (base64) returned by the camera
  currentImage = imageData.startsWith("data:")
    ? imageData.split(",")[1]
    : imageData;

  isRetaking = false;

  showPreview(currentImage);
};

const handlePhotoError = (error) => {
  console.log("Camera error:", error);

  if (isRetaking) {
    isRetaking = false;
    return;
  }

  // if the user cancels without a preview photo, return to the idle state
  cameraIdleElement.classList.remove("hidden");
  cameraPreviewElement.classList.add("hidden");
};

const showPreview = (imageData) => {
  previewContainerElement.innerHTML = "";

  const imageSrc = `data:image/jpeg;base64,${imageData}`;

  // Create image element
  const previewImage = document.createElement("img");

  // Set img attributes
  previewImage.src = imageSrc;
  previewImage.alt = "Preview Captured Photo";

  // Add image element to the preview container
  previewContainerElement.append(previewImage);

  // Show the preview instead of the idle camera screen
  cameraIdleElement.classList.add("hidden");
  cameraPreviewElement.classList.remove("hidden");
};

// Discard the current captured photo and return to the idle state
const discardPreview = () => {
  clearCurrentImage();

  cameraIdleElement.classList.remove("hidden");
  cameraPreviewElement.classList.add("hidden");
};

// Open the camera again while preserving the current preview in case the user cancels the retake
const retakePhoto = () => {
  isRetaking = true;

  openCamera();
};

// Clear current image data and preview
const clearCurrentImage = () => {
  currentImage = null;
  previewContainerElement.innerHTML = "";
};
