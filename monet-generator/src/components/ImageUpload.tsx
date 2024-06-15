import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import '../styles/ImageUpload.css';
import '../styles/Loader.css';

interface ImageUploadProps {
  setBeforeImage: (url: string) => void;
  setAfterImage: (url: string) => void;
  setLoading: (loading: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setBeforeImage, setAfterImage }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generator, setGenerator] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = document.createElement('img');
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 256;
          canvas.height = 256;
          ctx?.drawImage(img, 0, 0, 256, 256);
          resolve(canvas.toDataURL('image/png'));
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const resizedImageUrl = await resizeImage(file);
      setBeforeImage(resizedImageUrl);
    }
  };

  const handleGeneratorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGenerator(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile || !generator) {
      alert('Please select an image and a generator.');
      return;
    }
    setLoading(true);
    const resizedImageUrl = await resizeImage(selectedFile);
    const formData = new FormData();
    formData.append('image', dataURLToBlob(resizedImageUrl));
    formData.append('generator', generator);
    try {
      const response = await axios.post('https://monet-generator.hungwevision.com/api/upload/', formData, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);
      setAfterImage(url);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const dataURLToBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const buffer = new ArrayBuffer(byteString.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < byteString.length; i++) {
      view[i] = byteString.charCodeAt(i);
    }
    return new Blob([buffer], { type: mimeString });
  };

  return (
    <div className="upload-container">
      <h1>Monet Generator 🎨</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="file-upload" className="upload-btn">Choose Image</label>
        <input type="file" id="file-upload" onChange={handleFileChange} accept="image/*" required />
        <select name="generator" onChange={handleGeneratorChange} required title="Generator">
          <option value="" disabled selected>Select Generator</option>
          <option value="monet_generator_model.h5">Monet Generator</option>
          <option value="real_generator_model.h5">Real Generator</option>
        </select>
        <button type="submit" className="upload-btn">Upload</button>
      </form>
      {loading && (
        <div className="loader-overlay">
          <ClipLoader color="#ff7eb9" loading={loading} size={256} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
