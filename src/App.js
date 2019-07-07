import React, {useState} from 'react';
import './App.css';
import {BG} from "./components/common/pageRoot";
import {GlobalStyle} from "./components/common/globalStyle";
import {ViewRoute} from "./components/common/viewRoute/ViewRoute";
import {Lobby} from "./components/lobby";
import {Board} from "./components/board/board";
import {Nav} from "./components/nav/nav";
import {DefaultViewContext, useView} from "./components/common/viewRoute/ViewHook";
import {DebugContext} from "./components/board/debug";


function App() {
    const [boardId, setBoardId] = useState('');
    const [name, setName] = useState('');
    const [curView, setView] = useView('lobby');
    const [debug, setDebug] = useView(false);

    return (
        <BG>
            <DebugContext.Provider value={debug}>
                <DefaultViewContext.Provider value={'lobby'}>
                    <GlobalStyle heading/>
                    <Nav setView={setView} setDebug={setDebug} curView={curView}/>
                    <ViewRoute views={['lobby', 'board']} setView={setView} curView={curView}>
                        <Lobby setName={setName} setBoardId={setBoardId} setView={setView} curView={curView}/>
                        <Board name={name} boardId={boardId}
                               url={'wss://u0saflhbt3.execute-api.us-east-1.amazonaws.com/test'} setDebug={setDebug}/>
                    </ViewRoute>
                </DefaultViewContext.Provider>
            </DebugContext.Provider>
        </BG>
    );
}


export default App;
