'use strict';

const mysql = require('mysql');

class LinkedListNode {
    constructor(question, optionA, optionB, optionC, optionD, correctAnswer, creatorId) {
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctAnswer = correctAnswer;
        this.creatorId = creatorId;
        this.next = null;
    }
    getNext(){
        return this.next;
    }
    setNext(node){
        this.next = node;
    }
    editNode(question, optionA, optionB, optionC, optionD, correctAnswer){
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctAnswer = correctAnswer;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.config = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'kjquest'
        };
    }

    async addNode(question, optionA, optionB, optionC, optionD, correctAnswer) {
        const newNode = new LinkedListNode(question, optionA, optionB, optionC, optionD, correctAnswer);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.setNext(newNode);
            this.tail = newNode;
        }
        this.length++;
        await this.saveNodeToDatabase(newNode);
    }

    async addDefNode(node) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
        await this.saveNodeToDatabase(node);
    }

    removeNode() {
        if (!this.head) {
            return null;
        }
        const removedNode = this.head;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.getNext();
        }
        this.length--;
        return removedNode;
    }

    async saveNodeToDatabase(node) {
        let connection = mysql.createConnection(this.config);
        const sql = `
            INSERT INTO answers (question, optionA, optionB, optionC, optionD, correctOp, creatorId)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            node.question,
            node.optionA,
            node.optionB,
            node.optionC,
            node.optionD,
            node.correctAnswer,
            node.creatorId
        ];
        connection.connect();
        try {
            const rows = await connection.query(sql, values);
            console.log('Question saved to database.');
        } catch (error) {
            console.error(error);
        }
        connection.end();
    }

    async saveListToDatabase() {
        let current = this.head;
        while (current !== null) {
            await this.saveNodeToDatabase(current);
            current = current.next;
        }
        console.log('All questions saved to database');
    }

    async retrieveListFromDatabase() {
        let connection = mysql.createConnection(this.config);
        const sql = `
            SELECT *
            FROM answers WHERE creatorId = ?
        `;
        const id = this.creatorId;
        connection.connect();
        try {
            const [rows, fields] = await this.connection.execute(sql, id);
            for (const row of rows) {
                const newNode = new LinkedListNode(
                    row.question,
                    row.optionA,
                    row.optionB,
                    row.optionC,
                    row.optionD,
                    row.correctAnswer
                );
                if (!this.head) {
                    this.head = newNode;
                    this.tail = newNode;
                } else {
                    this.tail.next = newNode;
                    this.tail = newNode;
                }
                this.length++;
            }
            console.log('Questions retrieved from database');
        }
        catch (error) {
            console.error(error);
        }
        connection.end();
    }
}
let a = new LinkedList();
let b = new LinkedListNode("How far?", "Good", "Trying", "Moving", "Steady", "A", 1);
a.addDefNode(b);
console.log(a);