
import { VariantProps } from "class-variance-authority";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { HTMLAttributes } from "react";

export type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export type MenuBarSubTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
};

export type MenubarLabelProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
};

export type MenubarItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
};

