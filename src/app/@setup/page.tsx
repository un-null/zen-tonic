import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  Group,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

export default function Setup() {
  return (
    <Container size={"md"} p={16}>
      <form>
        <Flex gap={16} direction={"column"} w={"fit"} mt={40}>
          <Title order={3}>ページ URL を取得</Title>
          <TextInput
            type={"url"}
            label="ページURL"
            withAsterisk
            w={300}
            size={"xs"}
          />
        </Flex>
        <Flex direction={"column"} gap={32} mt={40}>
          <Box w={"fit"}>
            <Title order={3}>プロジェクトを作成</Title>
            <Text size={"sm"} mt={16}>
              習慣にしたいことを決めてみましょう！
            </Text>
          </Box>

          <Box>
            <TextInput label="タイトル" withAsterisk w={300} size={"xs"} />
            <Flex gap={16} mt={16}>
              <Select
                label="期間"
                data={["4 週間", "8 週間"]}
                defaultValue={"4 週間"}
                withAsterisk
                size={"xs"}
              />
              <CheckboxGroup label="曜日" withAsterisk size={"xs"}>
                <Group mt="xs">
                  <Checkbox value="Mon" label="月" />
                  <Checkbox value="Tue" label="火" />
                  <Checkbox value="Wed" label="水" />
                  <Checkbox value="Thu" label="木" />
                  <Checkbox value="Fri" label="金" />
                  <Checkbox value="Sat" label="土" />
                  <Checkbox value="Sun" label="日" />
                </Group>
              </CheckboxGroup>
            </Flex>
          </Box>

          <Box w={"fit"}>
            <Button type={"submit"}>作成</Button>
          </Box>
        </Flex>
      </form>
    </Container>
  );
}
