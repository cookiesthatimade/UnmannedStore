require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.get("/user", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("mysql connection error", err);
      res.status(500).send("Server error");
      return;
    }

    connection.query("SELECT * FROM user", (error, results) => {
      connection.release(); // 연결 해제
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Server error");
      } else {
        console.log("Fetched data:", results);
        res.json(results);
      }
    });
  });
});

router.post("/user", (req, res) => {
  const { username, price } = req.body; // 프론트엔드에서 보내는 데이터의 필드 이름과 일치하게 수정

  console.log("Received data:", req.body); // 디버깅을 위해 요청 데이터를 로그에 출력

  if (!username || !price) {
    res.status(400).send("Username and price are required."); // 오류 메시지 수정
    return;
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("mysql connection error", err);
      res.status(500).send("Server error");
      return;
    }

    connection.query(
      "INSERT INTO user (username, price) VALUES (?, ?)",
      [username, price],
      (error, results) => {
        connection.release();
        if (error) {
          console.error("Error inserting data:", error);
          res.status(500).send("Server error");
        } else {
          console.log(`Inserted new user: ${username}`);
          res.sendStatus(201);
        }
      }
    );
  });
});

router.delete("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("mysql connection error", err);
      res.status(500).send("Server error");
      return;
    }

    connection.query(
      "DELETE FROM user WHERE id = ?",
      [userId],
      (error, results) => {
        connection.release(); // 연결 해제
        if (error) {
          console.error("Error deleting user:", error);
          res.status(500).send("Server error");
        } else {
          console.log(`Deleted user with id ${userId}`);
          res.sendStatus(204); // 성공적으로 삭제됨을 클라이언트에게 응답
        }
      }
    );
  });
});

module.exports = router;
