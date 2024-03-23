import { SimpleGrid, Skeleton } from "@mantine/core";

export function UserInfoSkeleton() {
  return <Skeleton w={{ base: "auto" }} h={{ base: 324, md: 395 }} />;
}

export function ProjectHomekeleton() {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2 }} mt={32} w={"auto"}>
      <Skeleton style={{ aspectRatio: 1 }} w={{ base: "auto", md: 300 }} />
      <Skeleton style={{ aspectRatio: 1 }} w={{ base: "auto", md: 300 }} />
    </SimpleGrid>
  );
}
