import { useRef, useState } from 'react';

import Modal from './Modal';

export default function NewTask({ onAdd }) {
    const [enteredTask, setEnteredTask] = useState('');
    const modal = useRef();

    const handleChange = (e) => {
        setEnteredTask(e.target.value);
    };

    const handleClick = () => {
        if (enteredTask.trim() === '') {
            modal.current.open();
            return;
        }

        onAdd(enteredTask);
        setEnteredTask('');
    };

    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-700 my-4">
                    Invalid Input
                </h2>
                <p className="text-stone-600 mb-4">
                    Oops ... looks like you forgot to enter a value.
                </p>
            </Modal>
            <div className="flex ite gap-4">
                <input
                    type="text"
                    className="w-64 py-1 px-2 bg-stone-200 rounded-sm"
                    onChange={handleChange}
                    value={enteredTask}
                />
                <button
                    onClick={handleClick}
                    className="text-stone-700 hover:text-stone-950"
                >
                    Add Task
                </button>
            </div>
        </>
    );
}
