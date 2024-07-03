const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const shopRouter = require("./routes/shop"); // shop 라우터 불러오기

const app = express();

// CORS 설정
app.use(cors());

// Logger 및 기타 미들웨어 설정
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// view engine setup (만약 서버 사이드 렌더링을 사용하지 않는다면, 다음 라인을 삭제해도 됩니다.)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 라우팅 설정
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/shop", shopRouter); // '/api/shop' 경로에 shopRouter 설정

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 처리 미들웨어
app.use(function (req, res, next) {
  next(createError(404));
});

// 에러 핸들러
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// 서버 실행
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  // 모든 네트워크 인터페이스에서 접근 가능하게 설정
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
