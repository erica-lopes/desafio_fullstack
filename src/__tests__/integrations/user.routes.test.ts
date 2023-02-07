import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";
import { userData, userLogin, userDataUpdate } from "../../mocks/index";

describe("Testando rotas de usuário", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /user -> Deve ser capaz de criar um novo usuário", async () => {
    const result = await request(app).post("/user").send(userData);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    expect(result.body).not.toHaveProperty("password");
  });

  test("POST /login -> Deve ser capaz de fazer o login do usuário com autenticação", async () => {
    const resultLogin = await request(app).post("/login").send(userLogin);

    expect(resultLogin.status).toBe(200);
    expect(resultLogin.body).toHaveProperty("token");
  });

  test("GET /user/clients -> Deve ser capaz de listar todos os contatos do cliente", async () => {
    const login = await request(app).post("/login").send(userLogin);
    const { token } = login.body;
    const result = await request(app)
      .get("/user/clients")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
  });

  test("GET /user/clients -> Não deve ser capaz de listar todos os contatos do cliente sem autenticação", async () => {
    const result = await request(app).get("/user/clients");

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
  });

  test("GET /user/profile -> Deve ser capaz de imprimir o profile do usuário", async () => {
    const login = await request(app).post("/login").send(userLogin);
    const result = await request(app)
      .get("/user/profile")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(userData);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("email");
    expect(result.body).toHaveProperty("phoneNumber");
    expect(result.body).not.toHaveProperty("password");
  });

  test("GET /user/profile -> Não deve ser capaz de imprimir o profile do usuário sem autenticação", async () => {
    const result = await request(app).get("/user/profile");

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
  });

  test("PATCH /user -> Deve ser capaz de atualizar os dados do cliente", async () => {
    const login = await request(app).post("/login").send(userLogin);

    const result = await request(app)
      .patch("/user")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(userDataUpdate);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("registrationDate");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("email");
    expect(result.body).toHaveProperty("phoneNumber");
    expect(result.body).not.toHaveProperty("password");
  });

  test("PATCH /user -> Não deve ser capaz de atualizar os dados do cliente sem autorização", async () => {
    const result = await request(app).patch("/user").send(userDataUpdate);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
  });

  test("DELETE /user/:id -> Deve ser capaz de excluir a conta do cliente", async () => {
    await request(app).post("/user").send(userData);
    const login = await request(app).post("/login").send(userLogin);

    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Bearer ${login.body.token}`);

    const result = await request(app)
      .delete(`/user/${user.body.id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(result.status).toBe(204);
  });
});
