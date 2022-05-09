import React from "react";
import "./modal.css"
import classNames from 'classnames';

const Modal = ({active, setActive, children}) => {
    return (
        <div className={classNames(active ? "modal active" : "modal")} onClick={() => setActive(false)}>
            <div className={classNames(active ? "modal__content active" : "modal__content")} onClick={e => e.stopPropagation()}>
               {children}
            </div>
        </div>
    );
};

export default Modal;
