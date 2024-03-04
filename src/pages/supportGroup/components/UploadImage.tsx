/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// import styles from './uploadMultiple.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface PropsInter {
  formik: any;
  setImages: any;
  images: File[] | [];
}

export default function UploadMultiple(props: PropsInter) {
  const { formik, images, setImages } = props;
  const refUpload = useRef<HTMLDivElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const updatedImages = [...images];
    acceptedFiles.forEach((file) => {
      updatedImages.push(file);
    });
    formik.setFieldValue('images', updatedImages);
    setImages(updatedImages);
  };

  useEffect(() => {
    formik.setFieldValue('images', [...images]);
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteImage = (url: File) => {
    const remainImages = images.filter((image) => image !== url);
    formik.setFieldValue('images', [...remainImages]);
    setImages([...remainImages]);
  };

  return (
    <>
      <div className=" p-5 border-dashed border-2 rounded-lg bg-gray-50">
        <div
          {...getRootProps()}
          className={`${isDragActive ? ' dragable drag-active ' : ' dragable drag-inactive'}`}
        >
          <div className="uploadBox text-center" ref={refUpload} role="hidenClick">
            <FontAwesomeIcon icon="add" />
          </div>
          <input
            {...getInputProps()}
            multiple
            accept="image/*"
            onClick={() => refUpload?.current?.click()}
            data-testid="uploadonDrag"
          />
          <div className="details text-center text-gray-400">
            <p> Drop images here</p>
            <p className="text-xs">or click to select</p>
          </div>
        </div>
      </div>
      {images && (
        <div className=" p-3">
          {images.map((image, index) => (
            <div key={index} className="singleImg flex gap-4 text-sm text-blue-500 mb-2">
              <p>{image.name}</p>
              <span>
                <FontAwesomeIcon icon="close" onClick={() => handleDeleteImage(image)} />
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
