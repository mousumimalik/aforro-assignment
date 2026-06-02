import { useEffect, useId, useRef, useState } from 'react';

const DEFAULT_MESSAGE = 'This could be build on request';

export default function PlaceholderAction({
  children,
  message = DEFAULT_MESSAGE,
  className = '',
  align = 'left',
  as: Tag = 'button',
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  };

  const alignClass =
    align === 'right' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <Tag
        type={Tag === 'button' ? 'button' : undefined}
        className={`cursor-pointer ${className}`}
        onClick={toggle}
        aria-expanded={open}
        aria-controls={popoverId}
        {...rest}
      >
        {children}
      </Tag>
      {open && (
        <div
          id={popoverId}
          role="tooltip"
          className={`absolute z-50 top-[calc(100%+8px)] ${alignClass} min-w-[240px] max-w-[280px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-lg`}
        >
          <p className="mt-0 text-xs leading-relaxed text-gray-600">{message}</p>
        </div>
      )}
    </span>
  );
}
