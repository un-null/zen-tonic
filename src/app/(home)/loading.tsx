import { Flex, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Flex mt={40} justify={"center"} align={"center"}>
      <Loader color="#2483e2" />
    </Flex>
  );
}
