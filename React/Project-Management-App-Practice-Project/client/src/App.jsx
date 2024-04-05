import { useState } from 'react';

import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';
import SelectedProject from './components/SelectedProject';

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProject: undefined,
        projects: [],
        tasks: [],
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

    const handleDeleteProject = () => {
        setProjectsState((state) => {
            return {
                ...state,
                selectedProject: undefined,
                projects: state.projects.filter(
                    (project) => project.id !== state.selectedProject
                ),
            };
        });
    };

    const handleAddTask = (text) => {
        setProjectsState((state) => {
            const taskId = Math.random();
            const newTask = {
                text,
                projectId: state.selectedProject,
                id: taskId,
            };

            return {
                ...state,
                selectedProject: state.selectedProject,
                tasks: [...state.tasks, newTask],
            };
        });
    };

    const handleDeleteTask = (id) => {
        setProjectsState((state) => {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== id),
            };
        });
    };

    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProject
    );

    let content = (
        <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks}
        />
    );

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
                selectedProjectId={projectsState.selectedProject}
            />
            {content}
        </main>
    );
}

export default App;
