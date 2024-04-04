import { useState } from 'react';

import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProject: undefined,
        projects: [],
    });

    const handleStartAddProject = () => {
        setProjectsState((state) => {
            return {
                ...state,
                selectedProject: null,
            };
        });
    };

    const handleAddProject = (projectData) => {
        setProjectsState((state) => {
            const newProject = {
                ...projectData,
                id: Math.random(),
            };

            return {
                ...state,
                projects: [...state.projects, newProject],
            };
        });
    };

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar onStartAddProject={handleStartAddProject} />
            {projectsState.selectedProject === null ? (
                <NewProject onAdd={handleAddProject} />
            ) : (
                <NoProjectSelected onStartAddProject={handleStartAddProject} />
            )}
        </main>
    );
}

export default App;
