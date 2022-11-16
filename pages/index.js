import config from "../config.json"
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";
import { videoService } from "../src/services/videoService";

function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});

    // config.playlists

    React.useEffect(() => {
        service
            .getAllVideo()
            .then((dados) => {
                // Forma imutável
                const novasPlayLists = { ...playlists };
                dados.data.forEach((video) => {
                    if (!novasPlayLists[video.playlist]) novasPlayLists[video.playlist] = [];
                    novasPlayLists[video.playlist].push(video);
                });
                setPlaylists(novasPlayLists);
            });
    }, []);


    return (
        <>
            <CSSReset />
            <div style={
                {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }
            }>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                {/* <Splash /> */}
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={playlists}>
                    Conteudo
                </Timeline>
            </div>
        </>
    )
}
export default HomePage

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 15px 32px;
        gap: 16px;
    }

`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`http://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    );
}


function Timeline({ searchValue, ...propriedades }) {
    const playlistNames = Object.keys(propriedades.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {
                playlistNames.map((playlistName) => {
                    const videos = propriedades.playlists[playlistName];
                    {/* console.log(playlistName); */ }
                    {/* console.log(videos); */ }
                    return (
                        <section key={playlistName}>
                            <h2>{playlistName}</h2>
                            <div>
                                {
                                    videos
                                        .filter((video) => {
                                            const titleNormalized = video.title.toLowerCase();
                                            const searchValueNormalized = searchValue.toLowerCase();
                                            return titleNormalized.includes(searchValueNormalized)
                                        })
                                        .map((video) => {
                                            return (
                                                <a key={video.url} href={video.url}>
                                                    <img src={video.thumb} />
                                                    <span>{video.title}</span>
                                                </a>
                                            )
                                        })
                                }
                            </div>
                        </section>
                    )
                })
            }
        </StyledTimeline>
    )
}