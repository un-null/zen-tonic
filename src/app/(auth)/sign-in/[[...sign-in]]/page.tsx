import { SignIn } from "@clerk/nextjs";
import { Flex } from "@mantine/core";

export default function Page() {
  return (
    <Flex mt={40} justify={"center"}>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#2483e2",
            colorText: "#202020",
            colorAlphaShade: "#202020",
            borderRadius: "4px",
          },
          layout: {},
        }}
      />
    </Flex>
  );
}
