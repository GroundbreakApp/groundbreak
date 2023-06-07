import { useEffect, useRef, useState } from "react";

export function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    img.src = src;
  });
}

export default function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);
  let images = useRef<any>(null);
  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      console.log("PRELOAD");

      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<any>[] = [];
      for (const i of imageList) {
        imagesPromiseList.push(preloadImage(i));
      }

      images.current = await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, [imageList]);

  return { imagesPreloaded, images: images.current };
}
