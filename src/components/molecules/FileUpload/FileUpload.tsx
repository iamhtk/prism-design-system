import { useCallback, useId, useRef, useState } from 'react';
import styles from './FileUpload.module.css';

export type FileUploadProps = {
  onUpload?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  label?: string;
  hint?: string;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileUpload = ({
  onUpload,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  label,
  hint,
}: FileUploadProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const commitFiles = useCallback(
    (incoming: File[]) => {
      if (incoming.length === 0) return;

      const rejected: string[] = [];
      const accepted: File[] = [];

      for (const f of incoming) {
        if (maxSize != null && f.size > maxSize) {
          rejected.push(f.name);
        } else {
          accepted.push(f);
        }
      }

      if (rejected.length > 0) {
        setError(
          rejected.length === 1
            ? `"${rejected[0]}" exceeds the maximum file size.`
            : `${rejected.length} file(s) exceed the maximum size.`,
        );
      }

      if (accepted.length === 0) {
        return;
      }

      setError(null);
      setFiles((prev) => {
        const next = multiple ? [...prev, ...accepted] : accepted;
        onUpload?.(next);
        return next;
      });
    },
    [maxSize, multiple, onUpload],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (list?.length) {
      commitFiles(Array.from(list));
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length) {
      commitFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      e.dataTransfer.dropEffect = 'copy';
      setDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const openPicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const removeAt = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    setError(null);
    onUpload?.(next);
  };

  const zoneClass = [
    styles.zone,
    dragOver ? styles.zoneDrag : '',
    error != null ? styles.hasError : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.root}>
      {label != null ? (
        <p className={styles.label} id={`${inputId}-label`}>
          {label}
        </p>
      ) : null}
      <div
        className={zoneClass}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-labelledby={label != null ? `${inputId}-label` : undefined}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPicker();
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className={styles.uploadIcon} aria-hidden />
        <p className={styles.primaryText}>Drag and drop files here</p>
        <p className={styles.secondaryText}>or click to browse</p>
        {hint != null ? <p className={styles.hint}>{hint}</p> : null}
      </div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className={styles.visuallyHidden}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={label == null ? 'Choose files to upload' : undefined}
        onChange={handleInputChange}
      />
      {error != null ? <p className={styles.error}>{error}</p> : null}
      {files.length > 0 ? (
        <ul className={styles.fileList}>
          {files.map((file, index) => (
            <li key={`${file.name}-${file.size}-${index}`} className={styles.fileRow}>
              <div className={styles.fileMeta}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{formatBytes(file.size)}</span>
              </div>
              <button
                type="button"
                className={styles.removeBtn}
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(index);
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
