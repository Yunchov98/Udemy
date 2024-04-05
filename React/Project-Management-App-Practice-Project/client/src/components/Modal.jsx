import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from './Button';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialogRef.current.showModal();
            },
        };
    });

    return createPortal(
        <dialog
            ref={dialogRef}
            className="backdrop:bg-stone-900/90 p-40 rounded-md shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
});

export default Modal;
