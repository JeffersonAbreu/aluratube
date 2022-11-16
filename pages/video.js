import React from "react";
import { ColorModeContext } from "../src/components/Menu/components/ColorMode";

export default function Video({ v }) {
    const contexto = React.useContext(ColorModeContext);
    return (
        <div>
            Video
            <br />
            {contexto.mode}
            <br />
            <button onClick={() => contexto.toggleMode()}>
                Trocar tema
            </button>
        </div>
    );
}