import React, { useRef, useEffect, useState } from 'react';
import './FileUploader.scss';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '--' })('FileUploader');

const imageTypes = ['image/png', 'image/gif', 'image/bmp', 'image/jpg', 'image/jpeg'];

const FileUploader = props => {
  const fileWrapper = useRef(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const wrapper = fileWrapper.current;
    if (wrapper) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        wrapper.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
      });

      // Highlight drop area when item is dragged over it
      ['dragenter', 'dragover'].forEach(eventName => {
        wrapper.addEventListener(eventName, highlight, false);
      });
      ['dragleave', 'drop'].forEach(eventName => {
        wrapper.addEventListener(eventName, unhighlight, false);
      });

      wrapper.addEventListener('drop', handleDrop, false);

      function handleDrop(e) {
        e.preventDefault();
        if (e.dataTransfer) {
          let newFiles = fileListToArray(e.dataTransfer.files);
          if (props.type === 'image') {
            newFiles = newFiles.filter(file => imageTypes.includes(file.type));
          }
          if (newFiles.length) {
            setFiles(
              props.multiple ? [...newFiles] : [newFiles[newFiles.length - 1]]
            );
          }
        }
      }

      return () => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          wrapper.removeEventListener(eventName, preventDefaults, false);
          document.body.removeEventListener(eventName, preventDefaults, false);
        });
        ['dragenter', 'dragover'].forEach(eventName => {
          wrapper.removeEventListener(eventName, highlight, false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
          wrapper.removeEventListener(eventName, unhighlight, false);
        });
        wrapper.removeEventListener('drop', handleDrop, false);
      };
    }
  }, [props.multiple, props.type]);

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight() {
    fileWrapper.current && fileWrapper.current.classList.add('highlight');
  }

  function unhighlight() {
    fileWrapper.current && fileWrapper.current.classList.remove('highlight');
  }

  function onChange(e) {
    const newFiles = fileListToArray(e.target.files);
    setFiles(newFiles);
  }

  const removeFile = i => () => {
    if (files.length) {
      setFiles(f => f.filter((_, index) => index !== i));
    }
  };

  function fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  const isImage = type => {
    return imageTypes.includes(type);
  };

  const getType = () => {
    switch (props.type) {
      case 'image':
        return 'image/*';
      default:
        return '*';
    }
  };

  return (
    <div className={cn('')} ref={fileWrapper}>
      <div className={cn('form')}>
        <label htmlFor='file-input' className={cn('wrapper')}>
          Click or drag and drop
        </label>
        <input
          id='file-input'
          hidden
          onChange={onChange}
          type='file'
          multiple={props.multiple}
          accept={getType()}
        />
      </div>
      <div className={cn('preview')}>
        {files && files.length
          ? files.map((file, i) => (
              <div className={cn('preview__item')} key={file.name}>
                {isImage(file.type) ? (
                  <img src={URL.createObjectURL(file)} alt='' />
                ) : (
                  <p>{file.name}</p>
                )}
                <p onClick={removeFile(i)} className={cn('preview__close')}>
                  X
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

FileUploader.defaultProps = {
  multiple: false
};

export default FileUploader;
