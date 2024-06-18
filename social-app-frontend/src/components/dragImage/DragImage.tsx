import CloudIcon from '@mui/icons-material/Cloud';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC } from 'react';
import './dragImage.scss';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';

interface DragImageProps {
  changFilesHandler: (files: any[]) => void;
  filesPreview: any[];
  onDeletePreview: (index: number) => void;
}

const DragImage: FC<DragImageProps> = ({ changFilesHandler, filesPreview, onDeletePreview }) => {
  const [onDrag, setOnDrag] = React.useState<boolean>(false);
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setOnDrag(true);
    document.querySelector('.drag-area')?.classList.add('active');
  };

  const handleDragLeave = () => {
    setOnDrag(false);
    document.querySelector('.drag-area')?.classList.remove('active');
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setOnDrag(false);
    document.querySelector('.drag-area')?.classList.remove('active');
    const files = e.dataTransfer.files;
    if (files) {
      changFilesHandler(files);
    }
  };

  const handleButtonClick = () => {
    document.querySelector('.drag-area')?.classList.remove('active');
    const inputElement: HTMLInputElement = document.querySelector(
      ".drag-area input[type='file']"
    ) as HTMLInputElement;
    inputElement.click();
  };

  const handleInputChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      changFilesHandler(files);
    }
  };

  return (
    <div
      className="drag-area"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {filesPreview && filesPreview.length > 0 && (
        <div
          className="preview-wrapper"
          style={{
            width: '100%',
            minHeight: 'inherit',
          }}
        >
          {filesPreview[0].media_type === 'image' ? (
            <img src={filesPreview[0].url} alt="" />
          ) : (
            <Player
              src={filesPreview[0].url}
              dimensions={{ width: '100%', height: '100%' }}
              keyboardShortcut={false}
            >
              {(ref, props) => <video ref={ref} {...props} autoPlay />}
            </Player>
          )}
          <button
            type="button"
            className="delete-icon"
            onClick={(e) => {
              e.stopPropagation();
              onDeletePreview(0);
            }}
          >
            <ClearIcon />
          </button>
        </div>
      )}
      <div className="more-assets">
        {filesPreview &&
          filesPreview.length > 1 &&
          filesPreview.slice(1).map((a, index) => (
            <div key={a.url} className="preview-wrapper">
              {a.media_type === 'image' ? (
                <img src={a.url} alt="" />
              ) : (
                <Player
                  src={a.url}
                  dimensions={{ width: 150, height: 150 }}
                  keyboardShortcut={false}
                >
                  {(ref, props) => <video ref={ref} {...props} autoPlay />}
                </Player>
              )}
              <button
                type="button"
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePreview(index + 1);
                }}
              >
                <ClearIcon />
              </button>
            </div>
          ))}
      </div>

      {filesPreview?.length === 0 && (
        <>
          <div className="drag-icon">
            <CloudIcon sx={{ width: 100, height: 100 }} htmlColor="#be185d" />
          </div>
          <div className="drag-text">
            {onDrag ? 'Drop file here' : 'Drag Or Drop File to Upload'}
          </div>
          <span>OR</span>
          <button type="button" onClick={handleButtonClick}>
            Browse File
          </button>
        </>
      )}
      <input type="file" hidden multiple onChange={handleInputChange} />
    </div>
  );
};

export default DragImage;
