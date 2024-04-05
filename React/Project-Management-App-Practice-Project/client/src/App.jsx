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
                selectedProject: undefined,
                projects: [...state.projects, newProject],
            };
        });
    };

    const handleCancelAddProject = () => {
        setProjectsState((state) => {
            return {
                ...state,
                selectedProject: undefined,
            };
        });
    };

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
            />
            {projectsState.selectedProject === null ? (
                <NewProject
                    onAdd={handleAddProject}
                    onCancel={handleCancelAddProject}
                />
            ) : (
                <NoProjectSelected onStartAddProject={handleStartAddProject} />
            )}
        </main>
    );
}

export default App;
