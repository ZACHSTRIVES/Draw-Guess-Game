import React from 'react';
import Timer from './timer'

export default function TestRoom({ socket }) {
    const userName = "USER1"
    const testroom = {
        maxRound: 1, socoreBoard: [
            {
                userName: "USER1",
                score: 0,
            },
            {
                userName: "USER2",
                score: 0,
            },
        ],
        cuurent_user: 2,
        globalStatus: "waiting",
        game: { status: "ChoosingWord", round: 1, drawer: null, drawerindex: null },
    }
    const [roomInfo, setRoomInfo] = React.useState(testroom)

    const [word, setWord] = React.useState(null)



    React.useEffect(() => {
        socket.on('gameUpdate', (data) => {
            setRoomInfo(data)
        })
    }, []);

    React.useEffect(() => {
        socket.on('choosingWord', (data) => {
            setRoomInfo(data)
           
        })
    }, []);
    
    React.useEffect(() => {
        socket.on('drawing', (data) => {
            setRoomInfo(data)
            console.log("drawing",data)
            if(data.game.drawer===userName){
                setTimeout(function(){
                    socket.emit("finnishedDrawing")
                    console.log("时间到结束画图")
                },10000)
            }else{
                setTimeout(function(){
                    console.log("时间到!")
                },10000)
            } 
        })
    }, []);






    function handleStart() {
        socket.emit('beginGame')
        
    }
    
    function handleSet(word) {
        setWord(word)
        socket.emit("setWord",word)
    }


    return (
        <div>
            {(() => {
                if (roomInfo.globalStatus === "waiting") {
                    return (<button onClick={handleStart}>Start Game</button>)
                } else if (roomInfo.globalStatus === "playing") {
                    if (roomInfo.game.status === "ChoosingWord") {
                        if (roomInfo.game.drawer === userName) {
                            return (<div>
                                <button onClick={() => { handleSet("dog") }}>Dog</button>
                                <button onClick={() => { handleSet("cat") }}>Cat</button>
                                <button onClick={() => { handleSet("hml") }}>hml</button>
                            </div>)
                        }else{
                            return(<div>其他玩家正在选择单词</div>)

                        }
                    }else if(roomInfo.game.status==="drawing"){
                        if (roomInfo.game.drawer === userName) {
                            return (<div>
                                开始画画
                            </div>)
                        }else{
                            return(<div>开始答题</div>)

                        }

                    }else if(roomInfo.game.status==="finnished"){
                        return(<div>本轮结束：积分榜如下</div>)
                    }
                }else if(roomInfo.globalStatus==="finnished"){
                    return(<div>本剧游戏结束</div>)
                }

            

            })()}

        </div>

    )




}