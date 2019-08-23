import React from "react";

export class Socket {
    lastUpdate = new Date();
    interval;

    constructor(url, boardId, name) {
        this.ws = new WebSocket(url);
        this.ws.addEventListener('open', () => {
            this.ws.send(JSON.stringify({'action': 'join', 'boardId': boardId, 'name': name}));
        });

        this.ws.onmessage = (e) => {
            const update = JSON.parse(e.data);

            if (update.gameEvent === "update") {
                this.lastUpdate = new Date();
            }
        };

        this.interval = setInterval(() => {
            if ((new Date()) - this.lastUpdate > 6000 + (Math.floor(Math.random() * 5) + 1) * 1000) {
                this.nudge();
                this.lastUpdate = new Date();
            }
        }, 2000)
    }

    connection = () => {
        return this.ws;
    };
    start = () => {
        this.ws.send(JSON.stringify({'action': 'start'}));
    };
    nudge = () => {
        console.log("nudging server");
        this.ws.send(JSON.stringify({'action': 'nudge'}));
    };
    submit = (card) => {
        this.ws.send(JSON.stringify({'action': 'submit', 'card': card}));
    };
    judge = (card) => {
        this.ws.send(JSON.stringify({'action': 'judge', 'card': card}));
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

}
