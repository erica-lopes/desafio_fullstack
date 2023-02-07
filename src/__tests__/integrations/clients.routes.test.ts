import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";
import { clientData, userData, userLogin, clientDataUpdate } from "../../mocks";

describe("Testando rotas de contatos", () => {
  let connection: DataSource;
  let validUserToken: string;
  const invalidToken = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    //create user
    await request(app).post("/user").send(userData);

    //login user
    const login = await request(app).post("/login").send(userLogin);
    validUserToken = login.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /clients -> Deve ser capaz de criar um novo contato", async () => {
    const result = await request(app)
      .post("/clients")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(clientData);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("email");
    expect(result.body).toHaveProperty("phoneNumber");
    expect(result.body).toHaveProperty("user");
  });

  test("POST /clients -> Não deve ser capaz de criar um novo contato com id inválido", async () => {
    const result = await request(app)
      .post("/clients")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(clientData);

    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("message");
  });

  test("POST /clients -> Não deve ser capaz de criar um novo contato sem autorização", async () => {
    const result = await request(app).post("/clients").send(clientData);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
  });

  test("GET /clients/:id -> Deve ser capaz de imprimir o profile do cliente", async () => {
    const client = await request(app)
      .get("/user/clients")
      .set("Authorization", `Bearer ${validUserToken}`);

    const result = await request(app)
      .get(`/clients/${client.body[0].id}`)
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("email");
    expect(result.body).toHaveProperty("phoneNumber");
  });

  test("GET /clients/:id -> Não deve ser capaz de imprimir o profile do cliente sem autorização", async () => {
    const client = await request(app)
      .get("/user/clients")
      .set("Authorization", `Bearer ${validUserToken}`);

    const result = await request(app).get(`/clients/${client.body[0].id}`);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
  });

  test("PATCH /clients/:id -> Deve ser capaz de atualizar os dados do contato", async () => {
    const client = await request(app)
      .get("/user/clients")
      .set("Authorization", `Bearer ${validUserToken}`);

    const result = await request(app)
      .patch(`/clients/${client.body[0].id}`)
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(clientDataUpdate);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("registrationDate");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("email");
    expect(result.body).toHaveProperty("phoneNumber");
  });

  test("PATCH /clients/:id -> Não deve ser capaz de atualizar os dados do contato sem autorização", async () => {
    const client = await request(app)
      .get("/user/clients")
      .set("Authorization", `Bearer ${validUserToken}`);

    const result = await request(app)
      .patch(`/clients/${client.body[0].id}`)
      .send(clientDataUpdate);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
  });

  test("PATCH /clients/:id -> Deve ser capaz de deletar os dados do contato", async () => {
    const client = await request(app)
      .get("/user/clients")
      .set("Authorization", `Bearer ${validUserToken}`);

    const result = await request(app)
      .patch(`/clients/${client.body[0].id}`)
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(clientDataUpdate);

    expect(result.status).toBe(200);
  });
});
