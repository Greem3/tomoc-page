import { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from "@radix-ui/react-tabs";
import { ReactNode } from "react";

export interface ITabProps {
    props?: Omit<TabsContentProps, 'value'>;
    tabTriggerProp?: Omit<TabsTriggerProps, 'value'>;
    content: ReactNode;
}

export interface ITabsSectionProps extends Omit<TabsProps, 'defaultValue'> {
    tabs: { [tabName: string]: ITabProps };
    tabsListProps?: TabsListProps;
    allTabsContentClassName?: string;
    customDefaultValue?: string;
}