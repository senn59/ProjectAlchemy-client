import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api.ts";
import { ProjectResponse } from "@/projects/types.ts";

export default function Project() {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectResponse>();

    useEffect(() => {
        api.get(`/projects/${id}`)
            .then((r) => {
                setProject(r.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);
    return (
        <>
            {project && (
                <>
                    <h1>Name: {project.name}</h1>
                </>
            )}
        </>
    );
}
