import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

type ExtendedCustomColors = "original-gray" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
