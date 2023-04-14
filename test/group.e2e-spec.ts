import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { GroupsModule } from "../src/groups/groups.module";
import { getModelToken } from "@nestjs/sequelize";
import { Group } from "src/groups/groups.model";

describe("GroupController (e2e)", () => {
  let app: INestApplication;
  const mockGroupsRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GroupsModule],
    })
      .overrideProvider(getModelToken(Group))
      .useValue(mockGroupsRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/groups (GET)", () => {
    return request(app.getHttpServer()).get("/groups").expect(200);
  });
});
