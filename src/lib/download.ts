import html2canvas from "html2canvas";

// Takes a screenshot snapshot of the poster element, converts it to JPG, and auto downloads.
export async function downloadCreative(node: HTMLElement, filename: string) {
  const jpgFilename = filename.endsWith(".jpg") ? filename : filename.replace(/\.[^.]+$/, "") + ".jpg";

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  // Take a direct screenshot snapshot of the poster
  const canvas = await html2canvas(node, {
    useCORS: true,
    backgroundColor: "#FBF8F2",
    scale: 2, // 2x scale for 2160x2700 crisp JPG
    logging: false,
    allowTaint: true,
    width: 1080,
    height: 1350,
    windowWidth: 1080,
    windowHeight: 1350,
    onclone: (_clonedDoc, clonedElement) => {
      // Ensure the cloned poster snapshot is unscaled at native 1080x1350
      clonedElement.style.transform = "none";
      clonedElement.style.margin = "0";
      if (clonedElement.parentElement) {
        clonedElement.parentElement.style.transform = "none";
      }
    },
  });

  // Convert screenshot canvas to JPG
  const jpgDataUrl = canvas.toDataURL("image/jpeg", 0.95);

  // Auto download the JPG image file
  const link = document.createElement("a");
  link.download = jpgFilename;
  link.href = jpgDataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Share creative image directly via Web Share API when supported
export async function shareCreativeImage(node: HTMLElement, title: string, text: string) {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const canvas = await html2canvas(node, {
    useCORS: true,
    backgroundColor: "#FBF8F2",
    scale: 2,
    logging: false,
    allowTaint: true,
    width: 1080,
    height: 1350,
    windowWidth: 1080,
    windowHeight: 1350,
    onclone: (_clonedDoc, clonedElement) => {
      clonedElement.style.transform = "none";
      clonedElement.style.margin = "0";
      if (clonedElement.parentElement) {
        clonedElement.parentElement.style.transform = "none";
      }
    },
  });

  return new Promise<void>((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error("Failed to generate image blob"));
        return;
      }
      try {
        const file = new File([blob], "property-post.jpg", { type: "image/jpeg" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: title || "Property Creative",
            text: text || "Check out this property listing!",
            files: [file],
          });
        } else if (navigator.share) {
          await navigator.share({
            title: title || "Property Creative",
            text: text || "Check out this property listing!",
          });
        } else {
          alert("Sharing image files is not supported on this browser. You can download the post JPG and share manually.");
        }
        resolve();
      } catch (err) {
        // User aborted share or share failed
        console.warn("Share cancelled or failed", err);
        resolve();
      }
    }, "image/jpeg", 0.95);
  });
}
