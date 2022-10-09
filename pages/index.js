import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file'
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'gglhnmhf');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/daxrdiiyr/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="Upload your image to Cloudinary!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Image Uploader</h1>

        <p className={styles.description}>Upload your image to Cloudinary!</p>

        <form
          className={styles.form}
          method="post"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        >
          <p>
            {/* <input type="file" name="file" accept="image/*" /> */}
            <input
              style={{ display: 'none' }}
              type="file"
              name="file"
              id="file"
              accept="image/*"
            />
            <label htmlFor="file">
              <img
                src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/addAvatar.png"
                alt=""
              />
              <span>Add Image</span>
            </label>
          </p>

          <img src={imageSrc} />

          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </form>
      </main>

      <footer className={styles.footer}>
        <p>
          Find the tutorial on{' '}
          <a href="https://dungthinh.com/">dungthinh.com</a>!
        </p>
      </footer>
    </div>
  );
}
