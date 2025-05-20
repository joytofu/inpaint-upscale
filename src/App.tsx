/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import Button from './components/Button'
import FileSelect from './components/FileSelect'
import Modal from './components/Modal'
import Editor from './Editor'
import { resizeImageFile } from './utils'
import Progress from './components/Progress'
import { downloadModel } from './adapters/cache'
import * as m from './paraglide/messages'
import { onSetLanguageTag } from './paraglide/runtime'

function App() {
  const [file, setFile] = useState<File>()
  const [, setStateLanguageTag] = useState<'en' | 'en'>('en')

  // onSetLanguageTag(() => setStateLanguageTag(languageTag()))
  onSetLanguageTag(() => setStateLanguageTag('en'))

  const [showAbout, setShowAbout] = useState(false)
  const modalRef = useRef(null)

  const [downloadProgress, setDownloadProgress] = useState(100)

  useEffect(() => {
    downloadModel('inpaint', setDownloadProgress)
  }, [])

  useClickAway(modalRef, () => {
    setShowAbout(false)
  })

  async function startWithDemoImage(img: string) {
    const imgBlob = await fetch(`/examples/${img}.jpeg`).then(r => r.blob())
    setFile(new File([imgBlob], `${img}.jpeg`, { type: 'image/jpeg' }))
  }

  return (
    <div className="container min-h-full flex flex-col">
      <header className="z-10 shadow flex flex-row items-center md:justify-between h-14">
        <Button
          className={[
            file ? '' : 'opacity-50 pointer-events-none',
            'pl-1 pr-1 mx-1 sm:mx-5',
          ].join(' ')}
          icon={<ArrowLeftIcon className="w-6 h-6" />}
          onClick={() => {
            setFile(undefined)
          }}
        >
          <span>{m.start_new()}</span>
        </Button>
        <h1>Free Watermark Remover & Image Upscaler Powered By AI</h1>
        {/* <div className="hidden md:flex justify-end w-[300px] mx-1 sm:mx-5">
          <Button
            className="mr-5 flex"
            onClick={() => {
              if (languageTag() === 'zh') {
                setLanguageTag('en')
              } else {
                setLanguageTag('zh')
              }
            }}
          >
            <p>{languageTag() === 'en' ? '切换到中文' : 'en'}</p>
          </Button>
          <Button
            className="w-38 flex sm:visible"
            icon={<InformationCircleIcon className="w-6 h-6" />}
            onClick={() => {
              setShowAbout(true)
            }}
          >
            <p>{m.feedback()}</p>
          </Button>
        </div> */}
      </header>

      <main
        style={{
          height: 'calc(100vh - 56px)',
        }}
        className=" relative"
      >
        {file ? (
          <Editor file={file} />
        ) : (
          <>
            <section
              className="uploader-section"
              id="imageUploader"
              aria-labelledby="uploaderHeading"
            >
              <div className="flex h-full flex-1 flex-col items-center justify-center overflow-hidden">
                <div className="h-72 sm:w-1/2 max-w-5xl">
                  <FileSelect
                    onSelection={async f => {
                      const { file: resizedFile } = await resizeImageFile(
                        f,
                        1024 * 4
                      )
                      setFile(resizedFile)
                    }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row pt-10 items-center justify-center cursor-pointer">
                  <span className="text-gray-500">{m.try_it_images()}</span>
                  <div className="flex space-x-2 sm:space-x-4 px-4">
                    {[
                      'bag',
                      'dog',
                      'car',
                      'bird',
                      'jacket',
                      'shoe',
                      'paris',
                    ].map(image => (
                      <div
                        key={image}
                        onClick={() => startWithDemoImage(image)}
                        role="button"
                        onKeyDown={() => startWithDemoImage(image)}
                        tabIndex={-1}
                      >
                        <img
                          className="rounded-md hover:opacity-75 w-auto h-25"
                          src={`examples/${image}.jpeg`}
                          alt={image}
                          style={{ height: '100px' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="content-section">
              <h2>
                Welcome to MarkNull - Your Ultimate Image Enhancement Tool
              </h2>
              <p>
                MarkNull is your go-to free online solution for effortlessly{' '}
                <strong>removing watermarks from photos</strong> and{' '}
                <strong>upscaling images using advanced AI</strong>. Whether you
                need to clean up personal photos, prepare images for a project,
                or simply enhance their quality, MarkNull provides a fast,
                intuitive, and powerful platform. Best of all, it`s completely
                free and requires no login or software installation!
              </p>
            </section>
            <section className="content-section">
              <h2>Key Features</h2>
              <div>
                <h3>
                  <svg
                    style={{
                      width: '1em',
                      height: '1em',
                      verticalAlign: '-0.125em',
                      marginRight: '0.3em',
                    }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88L7 13.41l3 3 7-7-1.12-1.12z"
                    />
                  </svg>
                  AI Watermark Remover
                </h3>
                <p>
                  Our intelligent AI algorithm accurately identifies and erases
                  various types of watermarks from your images. Say goodbye to
                  distracting logos, text overlays, or date stamps. Simply
                  upload your image, and let our{' '}
                  <strong>photo watermark remover </strong>
                  provide you with a clean, professional-looking result. It's
                  perfect for restoring old photos or preparing images for
                  presentations.
                </p>
              </div>
              <div>
                <h3>
                  <svg
                    style={{
                      width: '1em',
                      height: '1em',
                      verticalAlign: '-0.125em',
                      marginRight: '0.3em',
                    }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    />
                  </svg>
                  AI Image Upscaler (up to 4x)
                </h3>
                <p>
                  Need to increase the resolution of your images without losing
                  quality? Our <strong>AI image upscaler free no login</strong>{' '}
                  service is here to help. Enhance your photos, making them
                  sharper and more detailed. This is ideal for improving the
                  quality of older digital photos, or when you need a larger
                  version of an image for print or display. Experience quality{' '}
                  <strong>upscaling image 4x online</strong>, or even more,
                  depending on the image.
                </p>
              </div>
              <div>
                <h3>
                  <svg
                    style={{
                      width: '1em',
                      height: '1em',
                      verticalAlign: '-0.125em',
                      marginRight: '0.3em',
                    }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
                    />
                  </svg>
                  Free, Fast, and No Login Required
                </h3>
                <p>
                  MarkNull is committed to providing a hassle-free experience.
                  Enjoy full access to our watermark removal and image upscaling
                  tools completely free of charge. There's no need to create an
                  account, log in, or download any software. Get started right
                  away!
                </p>
              </div>
            </section>
            <section className="content-section">
              <h2>How to Use MarkNull</h2>
              <ol>
                <li>
                  <strong>Upload Your Image:</strong> Click the "Click or drag
                  here" area or drag and drop your image file (JPG, PNG, WEBP
                  etc.).
                </li>
                <li>
                  <strong>Select Your Action:</strong> Choose whether you want
                  to remove a watermark or upscale the image. (Your UI will
                  guide this).
                </li>
                <li>
                  <strong>AI Processing:</strong> Our AI will analyze and
                  process your image in seconds.
                </li>
                <li>
                  <strong>Download:</strong> Preview your enhanced image and
                  download it directly to your device.
                </li>
              </ol>
            </section>
            <section className="content-section" id="faq">
              <h2>Frequently Asked Questions (FAQ)</h2>
              <div className="faq-item">
                <details>
                  <summary>
                    How do I remove a watermark from a photo for free?
                  </summary>
                  <p>
                    MarkNull offers a completely free{' '}
                    <strong>watermark removal</strong> service. Simply upload
                    your photo to our tool, and our AI will automatically detect
                    and remove the watermark. No payment or signup is required.
                  </p>
                </details>
              </div>
              <div className="faq-item">
                <details>
                  <summary>
                    Is there an AI image upscaler that doesn't require login?
                  </summary>
                  <p>
                    Yes! MarkNull provides an{' '}
                    <strong>AI image upscaler free no login</strong>. You can
                    enhance the resolution of your images directly on our
                    website without needing to create an account or provide any
                    personal information.
                  </p>
                </details>
              </div>
              <div className="faq-item">
                <details>
                  <summary>
                    Can I remove watermarks from Instagram photos?
                  </summary>
                  <p>
                    MarkNull can process images from various sources, including
                    those you might have saved from platforms like Instagram.
                    Our tool focuses on the technical{' '}
                    <strong>remove watermark from image</strong> process.
                    However, always ensure you have the necessary rights or
                    permissions to modify any image, especially if it's not your
                    own original content.
                  </p>
                </details>
              </div>
              <div className="faq-item">
                <details>
                  <summary>
                    What types of watermarks can MarkNull remove?
                  </summary>
                  <p>
                    Our AI is designed to handle a variety of watermarks,
                    including text overlays, logos, date stamps, and
                    semi-transparent watermarks. The effectiveness can vary
                    depending on the complexity and prominence of the watermark
                    on the image.
                  </p>
                </details>
              </div>
              <div className="faq-item">
                <details>
                  <summary>
                    How much can I upscale my image using the AI image upscaler?
                  </summary>
                  <p>
                    MarkNull can typically upscale images by a factor like 4x
                    while maintaining or improving quality. The exact capability
                    might vary. Our goal is to provide significant enhancement
                    for free.
                  </p>
                </details>
              </div>
            </section>
          </>
        )}
      </main>

      {showAbout && (
        <Modal>
          <div ref={modalRef} className="text-xl space-y-5">
            <p>
              {' '}
              任何问题到:{' '}
              <a
                href="https://github.com/lxfater/inpaint-web"
                style={{ color: 'blue' }}
                rel="noreferrer"
                target="_blank"
              >
                Inpaint-web
              </a>{' '}
              反馈
            </p>
            <p>
              {' '}
              For any questions, please go to:{' '}
              <a
                href="https://github.com/lxfater/inpaint-web"
                style={{ color: 'blue' }}
                rel="noreferrer"
                target="_blank"
              >
                Inpaint-web
              </a>{' '}
              to provide feedback.
            </p>
          </div>
        </Modal>
      )}
      {!(downloadProgress === 100) && (
        <Modal>
          <div className="text-xl space-y-5">
            <p>{m.inpaint_model_download_message()}</p>
            <Progress percent={downloadProgress} />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default App
