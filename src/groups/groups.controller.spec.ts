import { Test, TestingModule } from "@nestjs/testing";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";
import { CreateGroupsDto } from "./dto/create-group.dto";
import { Group } from "./groups.model";

describe("GroupsController", () => {
  let controller: GroupsController;

  const mockGroupService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService],
    })
      .overrideProvider(GroupsService)
      .useValue(mockGroupService)
      .compile();

    controller = module.get<GroupsController>(GroupsController);
  });
  it("should be def", () => {
    expect(controller).toBeDefined;
  });
  it("create a group", () => {
    expect(controller.createGroup({ keyword: "test" })).toEqual({
      id: expect.any(Number),
      keyword: "test",
    });
  });
});
