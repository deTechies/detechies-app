import protobuf from "protobufjs";

export interface IProjectFeed {
  id: string;
  message: string;
  comments: string[];
  likes: number;
}

export const PProjectFeed = new protobuf.Type("ProjectFeed")
  .add(new protobuf.Field("id", 1, "string"))
  .add(new protobuf.Field("message", 2, "string"))
  .add(new protobuf.Field("comments", 3, "string", "repeated"))
  .add(new protobuf.Field("likes", 4, "uint64"));