import NewTask from './NewTask';

export default function Tasks({ onAdd, onDelete, tasks }) {
    return (
        <section>
            <h2 className="text-2xl text-stone-700 mb-4 font-bold">Tasks</h2>
            <NewTask onAdd={onAdd} />
            {tasks.length === 0 && (
                <p className="my-4 text-stone-800">
                    This project does not have any tasks yet.
                </p>
            )}
            {tasks.length > 0 && (
                <ul className="mt-8 p-4 rounded-md bg-stone-100">
                    {tasks.map((task) => (
                        <li key={task.id} className="flex justify-between my-4">
                            <span>{task.text}</span>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="text-stone-700 hover:text-red-500"
                            >
                                Clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
