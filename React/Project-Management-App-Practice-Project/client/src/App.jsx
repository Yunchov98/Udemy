import { useState } from 'react';

import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';
import SelectedProject from './components/SelectedProject';

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

    const handleSelectProject = (id) => {
        setProjectsState((state) => {
            return {
                ...state,
                selectedProject: id,
            };
        });
    };

    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProject
    );

    let content = <SelectedProject project={selectedProject} />;

    if (projectsState.selectedProject === null) {
        content = (
            <NewProject
                onAdd={handleAddProject}
                onCancel={handleCancelAddProject}
            />
        );
    } else if (projectsState.selectedProject === undefined) {
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
            />
            {content}
        </main>
    );
}

export default App;
