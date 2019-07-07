import React from "react";

export class Socket {
    constructor(url, boardId, name) {
        this.ws = new WebSocket(url);
        this.ws.addEventListener('open', () => {
            this.ws.send(JSON.stringify({'action': 'join', 'boardId': boardId, 'name': name}));
        });
    }

    connection = () => {
        return this.ws;
    };

    start = () => {
        this.ws.send(JSON.stringify({'action': 'start'}));
    };
    nudge = () => {
        this.ws.send(JSON.stringify({'action': 'nudge'}));
    };
    submit = (card) => {
        this.ws.send(JSON.stringify({'action': 'submit', 'card': card}));
    };

    leave() {
        console.log('leaving');
        try {
            this.ws.send(JSON.stringify({"action": "leave"}));
        } catch (e) {
            console.log(e)
        }
        this.ws.close();
    }

    send = (d) => {
        this.ws.send(d)
    };

    chat = (msg) => {
        this.ws.send(JSON.stringify({
            "action": "chat", "message": msg
        }))
    };

    handleChat = (handler) => {
        this.connection().onmessage = (e) => {
            if (JSON.parse(e.data).gameEvent === 'chat') {
                handler(JSON.parse(e.data).message);
            }
        };
    }
}
