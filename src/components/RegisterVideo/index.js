import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

// Whiteboarding - sentar e discutir o que fazer
// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            // console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}
const supabaseUrl = 'https://hkfsdtcrepkwprzqivvx.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZnNkdGNyZXBrd3ByenFpdnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1MTUzMzMsImV4cCI6MTk4NDA5MTMzM30.9DoXVLbgbcMgJiOHBDITEGQseI0TQvXq5-RE3tlLx1k";
const supabase = createClient(supabaseUrl, supabaseKey);


// get youtube video id
function getVideoId(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
    }
    return videoId;
}

// get youtube thumbnail from ID
function getThumbnail(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {
            titulo: "",
            url: ""
        }
        // initialValues: { titulo: "Frost punk", url: "https://youtube.." }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
    - titulo
    - url do vídeo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        // console.log(formCadastro.values);

                        // Contrato entre o nosso FrontEnd e o BackEnd
                        supabase.from('video')
                            .insert(
                                {
                                    title: formCadastro.values.titulo,
                                    url: formCadastro.values.url,
                                    thumb: getThumbnail(getVideoId(formCadastro.values.url)),
                                    playlist: 'jogos',
                                }
                            )
                            .then((status) => {
                                console.log(status);
                            })
                            .catch((err) => {
                                console.log(err);
                            });

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input
                                placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false
            }
        </StyledRegisterVideo>
    )
}


// [X] Falta o botão para adicionar
// [X] Modal
// -> [X] Precisamos controlar o state
// -> Formulário em si