export default function SelectedProject({ project, onDelete }) {
    const formattedDate = new Date(project.dueDate).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }
    );

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold mb-2 text-stone-600">
                        {project.title}
                    </h1>
                    <button
                        onClick={onDelete}
                        className="text-stone-600 hover:text-stone-950"
                    >
                        Delete
                    </button>
                </div>
                <p className="text-stone-400 mb-4">{formattedDate}</p>
                <p className="whitespace-pre-wrap text-stone-600">
                    {project.description}
                </p>
            </header>
            TASKS
        </div>
    );
}